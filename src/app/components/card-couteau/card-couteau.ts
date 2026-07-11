import { Component, input, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-card-couteau',
  imports: [CardModule, GalleriaModule],
  templateUrl: './card-couteau.html',
  styleUrl: './card-couteau.css',
})
export class CardCouteau {
  image = input<string>("/bowie1.avif");
  image2 = input<string>("/couteau-accueil.avif");
  lame = input<string>();
  garde = input<string>();
  manche = input<string>();
  etui = input<string>();
  prix = input<number>();
  images = signal<{ itemImageSrc: string; thumbnailImageSrc: string }[]>([]);

  ngOnInit(){
    this.images.set([
      { itemImageSrc: this.image(), thumbnailImageSrc: this.image() },
      { itemImageSrc: this.image2(), thumbnailImageSrc: this.image2() }
    ]);
  }
}
