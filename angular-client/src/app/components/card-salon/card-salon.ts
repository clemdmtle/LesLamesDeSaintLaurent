import { Component, input, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { Tag } from '../tag/tag';

@Component({
  selector: 'app-card-salon',
  imports: [CardModule, GalleriaModule, Tag],
  templateUrl: './card-salon.html',
  styleUrl: './card-salon.css',
})
export class CardSalon {
  date = input<string>("");
  heure= input<string>("");
  ville = input<string>("");
  titre = input<string>();
  description = input<string>();
  images = signal<{ itemImageSrc: string; thumbnailImageSrc: string }[]>([]);
  image = input<string>("/evenement-accueil.jpg");
  image2 = input<string>("/couteau-accueil.avif");
  statut = input<string>("futur");

  ngOnInit(){
    this.images.set([
      { itemImageSrc: this.image(), thumbnailImageSrc: this.image() },
      { itemImageSrc: this.image2(), thumbnailImageSrc: this.image2() }
    ]);
  }
}
