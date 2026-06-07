import { Component } from '@angular/core';
import { Button, ButtonTypeEnum } from '../../components/button/button';
import { CardAccueil } from '../../components/card-accueil/card-accueil';
import { BandeauPieces } from "../../components/bandeau-pieces/bandeau-pieces";

@Component({
  selector: 'app-accueil',
  imports: [Button, CardAccueil, BandeauPieces],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {
  texteCouteau = "Un couteau de chasse typique devrait servir à des fins multiples, mais il est principalement utilisé pour vider,  dépouiller, et le découpage."
  texteEtui = "Les étuis sont réalisés faits main et s’adapteront parfaitement à vos nouveaux couteaux.";
  texteEvenements = "Je participe à beaucoup de salons afin de rencontrer de vous rencontrer et d'échanger sur ma passion, venez me rencontrer!";
  readonly ButtonTypeEnum = ButtonTypeEnum;
}
