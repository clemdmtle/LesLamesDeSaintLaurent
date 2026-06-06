import { Component, input } from '@angular/core';

export enum ButtonTypeEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}
@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  texte = input<string>('');
  type = input<ButtonTypeEnum>(ButtonTypeEnum.PRIMARY);
}
