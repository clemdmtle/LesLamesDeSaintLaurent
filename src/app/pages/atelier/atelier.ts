import { Component } from '@angular/core';
import { Modeles } from "../modeles/modeles";
import { Etuis } from "../etuis/etuis";
import { Matieres } from "../matieres/matieres";
import { BandeauPieces } from "../../components/bandeau-pieces/bandeau-pieces";

@Component({
  selector: 'app-atelier',
  imports: [Modeles, Etuis, Matieres, BandeauPieces],
  templateUrl: './atelier.html',
  styleUrl: './atelier.css',
})
export class Atelier {

}
