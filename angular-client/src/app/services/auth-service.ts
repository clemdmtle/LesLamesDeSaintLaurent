import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private connecte = signal<boolean>(false);
  readonly estConnecte = this.connecte.asReadonly();

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/api/auth/login', { email, password }, { withCredentials: true });
  }

  logout() {
    return this.http.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
  }

  verifierSession() {
    this.http.get('http://localhost:3000/api/auth/me', { withCredentials: true }).subscribe({
      next: () => this.connecte.set(true),
      error: () => this.connecte.set(false)
    });
  }

  definirConnecte(valeur: boolean) {
    this.connecte.set(valeur);
  }
}