import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

const API = environment.apiUrl;

export interface MessageContact {
  nom: string;
  email: string;
  sujet: string;
  message: string;
  siteWeb: string; // champ anti-spam (doit rester vide)
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);

  envoyer(data: MessageContact) {
    return this.http.post<{ message: string }>(API, data);
  }
}