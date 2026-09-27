import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Evenement } from '../types/evenement.type'; 

@Injectable({
  providedIn: 'root',
})
export class EvenementService {
  private http = inject(HttpClient);
  private evenements = signal<Evenement[]>([]);

  readonly evenements$ = this.evenements.asReadonly();

  chargerEvenements(){
    this.http.get<any[]>('http://localhost:3000/api/evenements').subscribe({
      next: (data) => {
        const evenements: Evenement[] = data.map(e => ({
          id: e.id,
          titre: e.titre,
          description: e.description,
          ville: e.ville,
          date: e.date,
          heure: e.heure,
          photo_1: e.photo_1,
          photo_2: e.photo_2,
          photo_3: e.photo_3,
          statut: e.statut,
        }));
        this.evenements.set(evenements);
    },
    error: (err) => console.error("Erreur lors du chargement des évènements", err)
    });
  }
}
