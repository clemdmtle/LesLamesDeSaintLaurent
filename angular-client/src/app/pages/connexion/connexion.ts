// src/app/pages/connexion/connexion.ts
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})
export class Connexion {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal<string>('');
  password = signal<string>('');
  erreur = signal<string | null>(null);
  chargement = signal<boolean>(false);

  seConnecter() {
    this.erreur.set(null);
    this.chargement.set(true);

    this.authService.login(this.email(), this.password()).subscribe({
      next: () => {
        this.authService.definirConnecte(true);
        this.chargement.set(false);
        this.router.navigate(['/']); // adapte vers la page de ton choix après connexion
      },
      error: (err) => {
        this.chargement.set(false);
        this.erreur.set(err.error?.message || 'Erreur de connexion');
      }
    });
  }
}