import { Component, computed, effect, inject, input, model, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { EvenementService } from '../../services/evenement-service';
import { Evenement } from '../../types/evenement.type';

const MAX_PHOTOS = 3;
const TAILLE_MAX = 5 * 1024 * 1024; // 5 Mo

@Component({
  selector: 'app-modal-evenement',
  imports: [ReactiveFormsModule, DialogModule, ButtonModule, InputTextModule, TextareaModule],
  templateUrl: './modal-evenement.html',
  styleUrl: './modal-evenement.css',
})
export class ModalEvenement {
  private evenementService = inject(EvenementService);
  private fb = new FormBuilder();

  visible = model<boolean>(false);
  // null = création, un évènement = modification
  evenement = input<Evenement | null>(null);

  fichiers = signal<File[]>([]);
  photosExistantes = signal<{ chemin: string; url: string }[]>([]);
  erreur = signal<string | null>(null);
  envoiEnCours = signal<boolean>(false);

  estEdition = computed(() => this.evenement() !== null);
  titre = computed(() => (this.estEdition() ? "Modifier l'évènement" : 'Ajouter un évènement'));
  nbPhotos = computed(() => this.photosExistantes().length + this.fichiers().length);

  evenementForm = this.fb.group({
    titre: ['', Validators.required],
    description: [''],
    ville: [''],
    date: ['', Validators.required],
    heure: [''],
  });

  constructor() {
    // À chaque ouverture, le formulaire est (ré)initialisé : vide ou pré-rempli
    effect(() => {
      if (this.visible()) {
        const e = this.evenement();
        untracked(() => this.initialiser(e));
      }
    });
  }

  private initialiser(e: Evenement | null) {
    this.fichiers.set([]);
    this.erreur.set(null);

    if (e) {
      this.photosExistantes.set(e.photos.map((chemin, i) => ({ chemin, url: e.images[i] })));
      this.evenementForm.reset(
        {
          titre: e.titre,
          description: e.description,
          ville: e.ville ?? '',
          date: e.date ?? '',
          heure: e.heure ?? '',
        },
        { emitEvent: false }
      );
    } else {
      this.photosExistantes.set([]);
      this.evenementForm.reset();
    }
  }

  onFichiers(event: Event) {
    const input = event.target as HTMLInputElement;
    const nouveaux = Array.from(input.files ?? []);
    input.value = ''; // permet de re-choisir le même fichier

    if (nouveaux.some(f => f.size > TAILLE_MAX)) {
      this.erreur.set('Chaque photo doit faire 5 Mo maximum.');
      return;
    }
    this.erreur.set(null);
    this.fichiers.update(liste => [...liste, ...nouveaux]);
  }

  retirerFichier(index: number) {
    this.fichiers.update(liste => liste.filter((_, i) => i !== index));
  }

  retirerExistante(index: number) {
    this.photosExistantes.update(liste => liste.filter((_, i) => i !== index));
  }

  close() {
    this.visible.set(false);
  }

  save() {
    if (this.evenementForm.invalid) {
      this.evenementForm.markAllAsTouched();
      return;
    }

    const v = this.evenementForm.getRawValue();
    const formData = new FormData();
    formData.append('titre', v.titre ?? '');
    formData.append('description', v.description ?? '');
    formData.append('ville', v.ville ?? '');
    formData.append('date', v.date ?? '');
    formData.append('heure', v.heure ?? '');
    formData.append('photosConservees', JSON.stringify(this.photosExistantes().map(p => p.chemin)));
    this.fichiers().forEach(f => formData.append('photos', f));

    const evenement = this.evenement();
    const requete = evenement
      ? this.evenementService.modifier(evenement.id, formData)
      : this.evenementService.creer(formData);

    this.envoiEnCours.set(true);
    requete.subscribe({
      next: () => {
        this.envoiEnCours.set(false);
        this.close();
      },
      error: (err) => {
        this.envoiEnCours.set(false);
        this.erreur.set(err.error?.message || "Erreur lors de l'enregistrement de l'évènement.");
      },
    });
  }
}