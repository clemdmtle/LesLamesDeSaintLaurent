import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Accueil', 
    routerLink: '/',
    routerlinkActiveOptions: { exact: true },
    routerLInkActive: 'active-link'
  },
  {
    label: "L'Atelier",
    items: [
      {
        label: 'Les modèles'
      },
      {
        label: 'Les étuis'
      },
      {
        label: 'Les matières'
      },
      {
        label: 'Les pièces disponibles'
      }
    ]
  },
  {
    label: 'Les Evènements',
    routerLink: '/evenements',
    routerlinkActiveOptions: { exact: true },
    routerLInkActive: 'active-link'
  },
  {
    label: 'A propos',
    routerLink: '/apropos',
    routerlinkActiveOptions: { exact: true },
    routerLInkActive: 'active-link'
  },
  {
    label: 'Contact',
    routerLink: '/contact',
    routerlinkActiveOptions: { exact: true },
    routerLInkActive: 'active-link'
  }
];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  items = MENU_ITEMS;
}
