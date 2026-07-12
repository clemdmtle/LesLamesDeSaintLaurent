import { Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-tag',
  imports: [TagModule],
  templateUrl: './tag.html',
  styleUrl: './tag.css',
})
export class Tag {
  texte = input.required<string>();
}
