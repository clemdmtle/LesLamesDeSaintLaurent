import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CardCouteau } from '../../components/card-couteau/card-couteau';
import { ButtonTypeEnum, Button } from '../../components/button/button';
import { ModalCouteau } from '../../components/modal-couteau/modal-couteau';
import { CouteauService } from '../../services/couteau-service';
import { GAMMES } from '../../types/gamme.enum';
import { AuthService } from '../../services/auth-service';
import { Couteau } from '../../types/couteau.type';

@Component({
  selector: 'app-pieces',
  imports: [AccordionModule, CardCouteau, Button, ModalCouteau],
  templateUrl: './pieces.html',
  styleUrl: './pieces.css',
})
export class Pieces implements OnInit {
  couteauService = inject(CouteauService);
  authService = inject(AuthService);
  isModalVisible = signal<boolean>(false);
  couteauEnEdition = signal<Couteau | null>(null);
  readonly ButtonTypeEnum = ButtonTypeEnum;

  ngOnInit() {
    this.couteauService.chargerCouteaux();
  }

  // Création : modale vide
  openModal() {
    this.couteauEnEdition.set(null);
    this.isModalVisible.set(true);
  }

  // Modification : modale pré-remplie avec le couteau choisi
  modifierCouteau(couteau: Couteau) {
    this.couteauEnEdition.set(couteau);
    this.isModalVisible.set(true);
  }

  supprimerCouteau(couteau: Couteau) {
    if (!confirm(`Supprimer définitivement ce couteau (${couteau.gamme}, lame ${couteau.lame}) ?`)) {
      return;
    }
    this.couteauService.supprimer(couteau.id).subscribe({
      error: (err) => alert(err.error?.message || 'Erreur lors de la suppression.'),
    });
  }

  rendreDisponibleCouteau(couteau: Couteau){
    if (!confirm(`Marquer ce couteau (${couteau.gamme}, lame ${couteau.lame}) comme vendu ? Son prix sera effacé.`)) {
      return;
    }
    this.couteauService.marquerVendu(couteau.id).subscribe({
      error: (err) => alert(err.error?.message || 'Erreur lors de la mise à jour.'),
    });
  }

  readonly TITRE_VENDUS = 'Couteaux vendus';

  gammesDefinitions = [...GAMMES, this.TITRE_VENDUS].map((title, i) => ({ title, value: String(i) }));

  tabs = computed(() => {
    const couteaux = this.couteauService.couteaux$();
    return this.gammesDefinitions.map(def => ({
      ...def,
      couteaux: couteaux.filter(c =>
        def.title === this.TITRE_VENDUS
          ? !c.estDisponible
          : c.gamme === def.title && c.estDisponible
      ),
    }));
  });
}