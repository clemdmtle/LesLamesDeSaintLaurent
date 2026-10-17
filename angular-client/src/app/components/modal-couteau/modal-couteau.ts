import { Component, inject, model, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { CouteauService } from '../../services/couteau-service';
import { GAMMES } from '../../types/gamme.enum';

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
  couteauCree = output<void>();

  gammes = GAMMES;
  fichiers = signal<File[]>([]);
  erreur = signal<string | null>(null);
  envoiEnCours = signal<boolean>(false);

  couteauForm = this.fb.group({
    gamme: ['', Validators.required],
    lame: ['', Validators.required],
    garde: [''],
    manche: [''],
    etui: [''],
    estDisponible: [false],
    prix: [null as number | null],
  });

  constructor() {
    this.couteauForm.get('estDisponible')?.valueChanges.subscribe(estDisponible => {
      const prixControl = this.couteauForm.get('prix');
      if (estDisponible) {
        prixControl?.setValidators([Validators.required, Validators.min(0)]);
      } else {
        prixControl?.clearValidators();
        prixControl?.setValue(null);
      }
      prixControl?.updateValueAndValidity();
    });
  }

  onFichiers(event: Event) {
    const input = event.target as HTMLInputElement;
    const choisis = Array.from(input.files ?? []);

    if (choisis.length > 3) {
      this.erreur.set('3 photos maximum.');
      input.value = '';
      return;
    }
    if (choisis.some(f => f.size > 5 * 1024 * 1024)) {
      this.erreur.set('Chaque photo doit faire 5 Mo maximum.');
      input.value = '';
      return;
    }
    this.erreur.set(null);
    this.fichiers.set(choisis);
  }

  close() {
    this.visible.set(false);
    this.couteauForm.reset({ estDisponible: false });
    this.fichiers.set([]);
    this.erreur.set(null);
  }

  save() {
    if (this.couteauForm.invalid) {
      this.couteauForm.markAllAsTouched();
      return;
    }

    const v = this.couteauForm.getRawValue();
    const formData = new FormData();
    formData.append('gamme', v.gamme ?? '');
    formData.append('lame', v.lame ?? '');
    formData.append('garde', v.garde ?? '');
    formData.append('manche', v.manche ?? '');
    formData.append('etui', v.etui ?? '');
    formData.append('vendu', String(!v.estDisponible));
    if (v.estDisponible && v.prix != null) {
      formData.append('prix', String(v.prix));
    }
    this.fichiers().forEach(f => formData.append('photos', f));

    this.envoiEnCours.set(true);
    this.couteauService.creer(formData).subscribe({
      next: () => {
        this.envoiEnCours.set(false);
        this.couteauCree.emit();
        this.close();
      },
      error: (err) => {
        this.envoiEnCours.set(false);
        this.erreur.set(err.error?.message || 'Erreur lors de la création du couteau.');
      },
    });
  }
}