import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common'; // Import standard

export enum ButtonTypeEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
}

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
  standalone: true
})
export class Button {
  texte = input<string>('');
  type = input<ButtonTypeEnum>(ButtonTypeEnum.PRIMARY);

  readonly ButtonTypeEnum = ButtonTypeEnum;
}