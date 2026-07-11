import { Component } from '@angular/core';
import { Modeles } from "../modeles/modeles";
import { Etuis } from "../etuis/etuis";
import { Matieres } from "../matieres/matieres";

@Component({
  selector: 'app-atelier',
  imports: [Modeles, Etuis, Matieres],
  templateUrl: './atelier.html',
  styleUrl: './atelier.css',
})
export class Atelier {

}
