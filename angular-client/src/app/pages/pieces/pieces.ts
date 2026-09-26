import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CardCouteau } from '../../components/card-couteau/card-couteau';
import { ButtonTypeEnum, Button } from '../../components/button/button';
import { ModalCouteau } from '../../components/modal-couteau/modal-couteau';
import { CouteauService } from '../../services/couteau-service';

@Component({
  selector: 'app-pieces',
  imports: [AccordionModule, CardCouteau, Button, ModalCouteau],
  templateUrl: './pieces.html',
  styleUrl: './pieces.css',
})
export class Pieces implements OnInit {
  couteauService = inject(CouteauService);
  isModalVisible = signal<boolean>(false);
  readonly ButtonTypeEnum = ButtonTypeEnum;

  ngOnInit(){
    this.couteauService.chargerCouteaux();
  }

  openModal() {
    this.isModalVisible.set(true);
  }

  gammesDefinitions = [
    { title: 'Bowie', value: 0 },
    { title: 'Chasse', value: 1 },
    { title: 'Casse-croute', value: 2 },
    { title: 'Dépeceur', value: 3 },
    { title: 'Puukko Typs', value: 4 },
    { title: 'Couteau de cou', value: 5 },
    { title: 'Pliant', value: 6 },
    { title: 'Pièce unique', value: 7 },
    { title: 'Couteaux vendus', value: 8 },
  ];

  tabs = computed(()=> {
    const couteaux = this.couteauService.couteaux$();
    return this.gammesDefinitions.map(def => ({
      ...def,
      couteaux: couteaux.filter(c => c.gamme == def.title)
    }));
  });
}
