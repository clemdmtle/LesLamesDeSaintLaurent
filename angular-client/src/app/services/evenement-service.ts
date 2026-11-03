import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Evenement } from '../types/evenement.type'; 
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

const SERVEUR = environment.apiUrl;
const API = `${SERVEUR}/api/evenements`;

@Injectable({
  providedIn: 'root',
})

export class EvenementService {
  private http = inject(HttpClient);
  private evenements = signal<Evenement[]>([]);

  readonly evenements$ = this.evenements.asReadonly();

  chargerEvenements() {
  this.http.get<any[]>(API).subscribe({
    next: (data) => {
      const evenements: Evenement[] = data.map(e => {
        // chemins stockés en base, sans les valeurs vides
        const photos = [e.photo_1, e.photo_2, e.photo_3].filter(Boolean) as string[];
        return {
          id: e.id,
          titre: e.titre,
          description: e.description ?? '',
          ville: e.ville,
          date: e.date,
          heure: e.heure,
          statut: e.statut,
          photos,                                  // chemins (pour photosConservees)
          images: photos.map(p => `${SERVEUR}${p}`), // URLs complètes (pour l'affichage)
        };
      });
      this.evenements.set(evenements);
    },
    error: (err) => console.error('Erreur lors du chargement des évènements', err),
  });
}

  creer(formData: FormData){
    return this.http.
    post(API, formData, { withCredentials: true})
    .pipe(tap(() => this.chargerEvenements()));
  }

  modifier(id: number, formData: FormData){
    return this.http.
    put(`${API}/${id}`, formData, { withCredentials: true})
    .pipe(tap(() => this.chargerEvenements()));
  }

  supprimer(id : number){
    return this.http
    .delete(`${API}/${id}`, { withCredentials : true})
    .pipe(tap(() => this.chargerEvenements()));
  }
}
