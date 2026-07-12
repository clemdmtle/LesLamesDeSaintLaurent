import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-modeles',
  imports: [CardModule],
  templateUrl: './modeles.html',
  styleUrl: './modeles.css',
})
export class Modeles {
  modeles = [
    {
      image: "bowie1.avif",
      nom: 'Bowie',
      description: "La forme de la lame permet au couteau Bowie d'être une arme aussi bien qu'un outil adapté pour chasser, pêcher ou camper. C'est un couteau robuste, adapté à un usage intensif et capable de supporter d'être maltraité en permanence﻿"
    },
    {
      image: "chasse.avif",
      nom: 'Chasse',
      description: "Le couteau de chasse est le 'compagnon' du chasseur, afin de servir l'animal..."
    },
    {
      image: "cassecroute.avif",
      nom: 'Casse-croûte',
      description: "Petit couteau polyvalent, utile à la chasse, à la pêche, en randonnée et même pour le casse-croûte ! "
    },
    {
      image: "depeceur.avif",
      nom: 'Dépeceur',
      description: "Sert à dépouiller le gibier."
    },
    {
      image: "puukko.avif",
      nom: 'Puukko Typs',
      description: "Le Puukko est un couteau d'origine Scandinave, multifonctions.﻿"
    },
    {
      image: "couteaudecou.avif",
      nom: 'Couteau de cou',
      description: "Petit couteau utilitaire pouvant être porté autour du cou"
    },
    {
      image: "pliant.avif",
      nom: 'Pliant',
      description: "Couteau dont la lame se replie dans le manche, pratique pour le transport"
    },
    {
      image: "pieceunique.avif",
      nom: 'Pièces uniques',
      description: "Couteau fait sur-mesure, à la demande du client"
    }
  ]
}
