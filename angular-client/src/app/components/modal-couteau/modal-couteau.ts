  import { Component, model, output } from '@angular/core';
  import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
  import { DialogModule } from 'primeng/dialog';
  import { ButtonModule } from 'primeng/button';
  import { InputTextModule } from 'primeng/inputtext';
  import { Couteau } from '../../types/couteau.type';
  import { CheckboxModule } from 'primeng/checkbox';

  @Component({
    selector: 'app-modal-couteau',
    templateUrl: './modal-couteau.html',
    styleUrl: './modal-couteau.css',
    standalone: true,
      imports: [DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule, CheckboxModule],
  })
  export class ModalCouteau {
    visible = model<boolean>(false);
    couteauCree = output<Couteau>();

    private fb = new FormBuilder();

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
    // met à jour dynamiquement la validation du prix selon estDisponible
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


    close() {
      this.visible.set(false);
      this.couteauForm.reset();
    }

    save() {
      if (this.couteauForm.invalid) {
        this.couteauForm.markAllAsTouched();
        return;
      }
      this.couteauCree.emit(this.couteauForm.getRawValue() as Couteau);
      this.close();
    }
  }
