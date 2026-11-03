import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';

const SERVEUR = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private connecte = signal<boolean>(false);
  readonly estConnecte = this.connecte.asReadonly();

  login(email: string, password: string) {
    return this.http.post(`{SERVEUR}/api/auth/login`, { email, password }, { withCredentials: true });
  }

  logout() {
    return this.http.post(`{SERVEUR}/api/auth/logout`, {}, { withCredentials: true });
  }

  verifierSession() {
    this.http.get(`{SERVEUR}/api/auth/me`, { withCredentials: true }).subscribe({
      next: () => this.connecte.set(true),
      error: () => this.connecte.set(false)
    });
  }

  definirConnecte(valeur: boolean) {
    this.connecte.set(valeur);
  }
}