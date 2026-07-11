import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Accueil', 
    routerLink: '/',
    routerLinkActiveOptions: { exact: true },
    routerLinkActive: 'active-link'
  },
  {
    label: "L'Atelier",
    routerLink: '/atelier',
    items: [
      {
        label: 'Les modèles',
        routerLink: '/atelier',
        fragment: 'modeles',
      },
      {
        label: 'Les étuis',
        routerLink: '/atelier',
        fragment: 'etuis',
      },
      {
        label: 'Les matières',
        routerLink: '/atelier',
        fragment: 'matieres',
      }
    ]
  },
  {
    label: 'Les Pièces',
    routerLink: '/pieces',
    routerLinkActiveOptions: { exact: true },
    routerLinkActive: 'active-link'
  },
  {
    label: 'Les Evènements',
    routerLink: '/evenements',
    routerLinkActiveOptions: { exact: true },
    routerLinkActive: 'active-link'
  },
  {
    label: 'Contact',
    routerLink: '/contact',
    routerLinkActiveOptions: { exact: true },
    routerLinkActive: 'active-link'
  }
];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  items = MENU_ITEMS;
}
