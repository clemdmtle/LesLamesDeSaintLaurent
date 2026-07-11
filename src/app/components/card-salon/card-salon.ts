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
  date = input<string>("12 juin 2026");
  heure= input<string>("9h - 18h");
  ville = input<string>("Epinal");
  titre = input<string>();
  description = input<string>();
  images = signal<{ itemImageSrc: string; thumbnailImageSrc: string }[]>([]);
  image = input<string>("/evenement-accueil.jpg");
  image2 = input<string>("/couteau-accueil.avif");

  ngOnInit(){
    this.images.set([
      { itemImageSrc: this.image(), thumbnailImageSrc: this.image() },
      { itemImageSrc: this.image2(), thumbnailImageSrc: this.image2() }
    ]);
  }
}
