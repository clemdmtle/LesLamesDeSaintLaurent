import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CardCouteau } from '../../components/card-couteau/card-couteau';
import { ButtonTypeEnum, Button } from '../../components/button/button';
import { ModalCouteau } from '../../components/modal-couteau/modal-couteau';
import { CouteauService } from '../../services/couteau-service';
import { GAMMES } from '../../types/gamme.enum';
import { AuthService } from '../../services/auth-service';

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
  readonly ButtonTypeEnum = ButtonTypeEnum;

  ngOnInit(){
    this.couteauService.chargerCouteaux();
  }

  openModal() {
    this.isModalVisible.set(true);
  }

  readonly TITRE_VENDUS = 'Couteaux vendus';

gammesDefinitions = [...GAMMES, this.TITRE_VENDUS].map((title, value) => ({ title, value }));

tabs = computed(() => {
  const couteaux = this.couteauService.couteaux$();
  return this.gammesDefinitions.map(def => ({
    ...def,
    couteaux: couteaux.filter(c =>
      def.title === this.TITRE_VENDUS
        ? !c.estDisponible
        : c.gamme === def.title && c.estDisponible
    )
  }));
});
}
