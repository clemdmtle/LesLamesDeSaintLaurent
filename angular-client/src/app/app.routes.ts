import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./pages/accueil/accueil').then(m => m.Accueil), title: 'Accueil'},
    {path: 'atelier', loadComponent: () => import('./pages/atelier/atelier').then(m => m.Atelier), title: 'Atelier'},
    {path: 'pieces', loadComponent: () => import('./pages/pieces/pieces').then(m => m.Pieces), title: 'Les Pièces'},
    {path: 'evenements', loadComponent: () => import('./pages/evenements/evenements').then(m => m.Evenements), title: 'Les Evènements'},
    {path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact), title: 'Contact'}
];
