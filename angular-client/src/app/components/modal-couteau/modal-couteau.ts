import { Component, computed, effect, inject, input, model, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { CouteauService } from '../../services/couteau-service';
import { GAMMES } from '../../types/gamme.enum';
import { Couteau } from '../../types/couteau.type';

const MAX_PHOTOS = 3;
const TAILLE_MAX = 5 * 1024 * 1024; // 5 Mo

@Component({
  selector: 'app-modal-couteau',
  templateUrl: './modal-couteau.html',
  styleUrl: './modal-couteau.css',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule, CheckboxModule, SelectModule],
})
export class ModalCouteau {
  private couteauService = inject(CouteauService);
  private fb = new FormBuilder();

  visible = model<boolean>(false);
  // null = création, un couteau = modification
  couteau = input<Couteau | null>(null);

  gammes = GAMMES;
  fichiers = signal<File[]>([]);
  photosExistantes = signal<{ chemin: string; url: string }[]>([]);
  erreur = signal<string | null>(null);
  envoiEnCours = signal<boolean>(false);

  estEdition = computed(() => this.couteau() !== null);
  titre = computed(() => (this.estEdition() ? 'Modifier le couteau' : 'Ajouter un couteau'));
  nbPhotos = computed(() => this.photosExistantes().length + this.fichiers().length);

  couteauForm = this.fb.group({
    gamme: ['', Validators.required],
    lame: ['', Validators.required],
    garde: [''],
    manche: [''],
    etui: [''],
    estVendu: [false],
    prix: [null as number | null],
  });

  constructor() {
    this.couteauForm.get('estVendu')?.valueChanges.subscribe(estVendu => {
      this.majValidationPrix(!!estVendu);
    });

    // À chaque ouverture, le formulaire est (ré)initialisé : vide ou pré-rempli
    effect(() => {
      if (this.visible()) {
        const c = this.couteau();
        untracked(() => this.initialiser(c));
      }
    });
  }

  private majValidationPrix(estVendu: boolean) {
    const prixControl = this.couteauForm.get('prix');
    if (estVendu) {
      prixControl?.clearValidators();
      prixControl?.setValue(null);
    } else {
      prixControl?.setValidators([Validators.required, Validators.min(0)]);
    }
    prixControl?.updateValueAndValidity();
  }

  private initialiser(c: Couteau | null) {
    this.fichiers.set([]);
    this.erreur.set(null);

    if (c) {
      this.photosExistantes.set(c.photos.map((chemin, i) => ({ chemin, url: c.images[i] })));
      this.couteauForm.reset(
        {
          gamme: c.gamme,
          lame: c.lame,
          garde: c.garde ?? '',
          manche: c.manche ?? '',
          etui: c.etui ?? '',
          estVendu: !c.estDisponible,
          prix: c.prix ?? null,
        },
        { emitEvent: false }
      );
      this.majValidationPrix(!c.estDisponible);
    } else {
      this.photosExistantes.set([]);
      this.couteauForm.reset({ estVendu: false }, { emitEvent: false });
      this.majValidationPrix(false);
    }
  }

  onFichiers(event: Event) {
    const input = event.target as HTMLInputElement;
    const nouveaux = Array.from(input.files ?? []);
    input.value = ''; // permet de re-choisir le même fichier

    if (this.nbPhotos() + nouveaux.length > MAX_PHOTOS) {
      this.erreur.set(`${MAX_PHOTOS} photos maximum.`);
      return;
    }
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
    if (this.couteauForm.invalid) {
      this.couteauForm.markAllAsTouched();
      return;
    }
    if (this.nbPhotos() === 0) {
      this.erreur.set('Ajoute au moins une photo.');
      return;
    }

    const v = this.couteauForm.getRawValue();
    const formData = new FormData();
    formData.append('gamme', v.gamme ?? '');
    formData.append('lame', v.lame ?? '');
    formData.append('garde', v.garde ?? '');
    formData.append('manche', v.manche ?? '');
    formData.append('etui', v.etui ?? '');
    formData.append('vendu', String(!!v.estVendu));
    if (!v.estVendu && v.prix != null) {
      formData.append('prix', String(v.prix));
    }
    formData.append('photosConservees', JSON.stringify(this.photosExistantes().map(p => p.chemin)));
    this.fichiers().forEach(f => formData.append('photos', f));

    const couteau = this.couteau();
    const requete = couteau
      ? this.couteauService.modifier(couteau.id, formData)
      : this.couteauService.creer(formData);

    this.envoiEnCours.set(true);
    requete.subscribe({
      next: () => {
        this.envoiEnCours.set(false);
        this.close();
      },
      error: (err) => {
        this.envoiEnCours.set(false);
        this.erreur.set(err.error?.message || "Erreur lors de l'enregistrement du couteau.");
      },
    });
  }
}