import { Component } from '@angular/core';
import { Button, ButtonTypeEnum } from "../button/button";

@Component({
  selector: 'app-bandeau-pieces',
  imports: [Button],
  templateUrl: './bandeau-pieces.html',
  styleUrl: './bandeau-pieces.css',
})
export class BandeauPieces {
  ButtonTypeEnum = ButtonTypeEnum;
}
