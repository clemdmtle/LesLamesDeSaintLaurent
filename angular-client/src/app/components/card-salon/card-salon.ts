import { Component, input, computed, output, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { Tag } from '../tag/tag';
import { Button, ButtonTypeEnum } from '../button/button';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-card-salon',
  imports: [CardModule, GalleriaModule, Tag, Button],
  templateUrl: './card-salon.html',
  styleUrl: './card-salon.css',
})
export class CardSalon {
  authService = inject(AuthService);
  readonly ButtonTypeEnum = ButtonTypeEnum;

  date = input<string>('');
  heure = input<string>('');
  ville = input<string | null>('');
  titre = input<string>();
  description = input<string | null>();
  images = input<string[]>([]);

  modifier = output<void>();
  supprimer = output<void>();

  galerie = computed(() =>
    this.images().map(src => ({ itemImageSrc: src, thumbnailImageSrc: src }))
  );

  // 2026-12-23 -> 23 décembre 2026
  dateFormatee = computed(() => {
    const d = this.date();
    if (!d) return '';
    const [annee, mois, jour] = d.slice(0, 10).split('-').map(Number);
    return new Date(annee, mois - 1, jour).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  });

  // 09:30:00 -> 09:30
  heureFormatee = computed(() => this.heure().slice(0, 5));
}