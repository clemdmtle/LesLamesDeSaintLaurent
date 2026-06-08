import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-couteau',
  imports: [CardModule],
  templateUrl: './card-couteau.html',
  styleUrl: './card-couteau.css',
})
export class CardCouteau {
  image = input<string>();
  lame = input<string>();
  garde = input<string>();
  manche = input<string>();
  etui = input<string>();
  prix = input<number>();
}
