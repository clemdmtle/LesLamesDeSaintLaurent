import { Component, inject, signal } from '@angular/core';
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
export class Pieces {
  couteauService = inject(CouteauService);
  isModalVisible = signal<boolean>(false);
  readonly ButtonTypeEnum = ButtonTypeEnum;
  openModal() {
    this.isModalVisible.set(true);
  }

  tabs = [
    {
      title : 'Bowie',
      content : ['content1'],
      value: 0,
      couteaux: [
        {id: 1, image: 'bowie1.avif', lame: 'Acier D2', garde: 'Laiton', manche: 'Bois de rose', etui: 'Cuir', prix: 300},
        {id: 2, image: 'bowie1.avif', lame: 'Acier D2', garde: 'Laiton', manche: 'Bois de rose', etui: 'Cuir', prix: 300},
        {id: 3, image: 'bowie1.avif', lame: 'Acier D2', garde: 'Laiton', manche: 'Bois de rose', etui: 'Cuir', prix: 300},
        {id: 4, image: 'bowie1.avif', lame: 'Acier D2', garde: 'Laiton', manche: 'Bois de rose', etui: 'Cuir', prix: 300},
        {id: 5, image: 'bowie1.avif', lame: 'Acier D2', garde: 'Laiton', manche: 'Bois de rose', etui: 'Cuir', prix: 300},
        {id: 6, image: 'bowie1.avif', lame: 'Acier D2', garde: 'Laiton', manche: 'Bois de rose', etui: 'Cuir', prix: 300},
        {id: 7, image: 'bowie1.avif', lame: 'Acier D2', garde: 'Laiton', manche: 'Bois de rose', etui: 'Cuir', prix: 300},
      ]
    },
    {
      title : 'Chasse',
      content : ['content1'],
      value: 1
    },
    {
      title : 'Casse-croute',
      content : ['content1'],
      value: 2

    },
    {
      title : 'Dépeceur',
      content : ['content1'],
      value: 3
    },
    {
      title : 'Puukko Typs',
      content : ['content1'],
      value: 4
    },
    {
      title : 'Couteau de cou',
      content : ['content1'],
      value: 5
    },
    {
      title : 'Pliant',
      content : ['content1'],
      value: 6
    },
    {
      title : 'Pièce unique',
      content : ['content1'], 
      value: 7
    },
    {
      title : 'Couteaux vendus',
      content : ['content1'],
      value: 8
    },
  ]
}
