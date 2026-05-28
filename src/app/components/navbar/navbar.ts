import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Accueil',
        routerLink: '/'
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
        label: 'Les Evènements'
      },
      {
        label: 'A propos'
      },
      {
        label: 'Contact'
      }
    ]
    
  }
}
