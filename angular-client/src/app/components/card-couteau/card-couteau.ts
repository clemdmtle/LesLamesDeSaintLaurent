import { Component, computed, input, inject, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button'
import { AuthService } from '../../services/auth-service';
import { ButtonTypeEnum, Button } from '../../components/button/button';

@Component({
  selector: 'app-card-couteau',
  imports: [CardModule, GalleriaModule, Button, ButtonModule],
  templateUrl: './card-couteau.html',
  styleUrl: './card-couteau.css',
})
export class CardCouteau {
  readonly authService = inject(AuthService);
  readonly ButtonTypeEnum = ButtonTypeEnum;

  images = input<string[]>([]);
  lame = input<string>();
  garde = input<string>();
  manche = input<string>();
  etui = input<string>();
  prix = input<number | null>();

  // La carte ne gère ni la modale ni la suppression : elle prévient son parent
  modifier = output<void>();
  supprimer = output<void>();
  rendreDisponible = output<void>();


  galerie = computed(() =>
    this.images().map(src => ({ itemImageSrc: src, thumbnailImageSrc: src }))
  );
}