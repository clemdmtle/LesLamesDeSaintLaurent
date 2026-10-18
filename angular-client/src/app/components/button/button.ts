import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common'; // Import standard

export enum ButtonTypeEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  UPDATE = 'update',
  DELETE = 'delete',
  SOLD = 'sold'
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
  lien = input<string>();
  iconOnly = input<boolean>(false);

  readonly ButtonTypeEnum = ButtonTypeEnum;
}