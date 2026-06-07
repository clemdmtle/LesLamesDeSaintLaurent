import { Component } from '@angular/core';
import { MENU_ITEMS } from '../navbar/navbar';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-footer',
  imports: [Divider],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  items = MENU_ITEMS;
}
