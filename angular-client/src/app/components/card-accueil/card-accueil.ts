import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-accueil',
  imports: [ButtonModule, CardModule],
  templateUrl: './card-accueil.html',
  styleUrl: './card-accueil.css',
})
export class CardAccueil {
  texte = input<string>('');
  image = input<string>('');
  lien = input<string>('');
}
