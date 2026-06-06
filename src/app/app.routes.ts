import { Routes } from '@angular/router';
import { App } from './app';
import { Accueil } from './pages/accueil/accueil';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./pages/accueil/accueil').then(m => m.Accueil), title: 'Accueil'},
    {path: 'evenements', loadComponent: () => import('./pages/evenements/evenements').then(m => m.Evenements), title: 'Les Evènements'},
    {path: 'apropos', loadComponent: () => import('./pages/apropos/apropos').then(m => m.Apropos), title: 'A propos'},
    {path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact), title: 'Contact'}
];
