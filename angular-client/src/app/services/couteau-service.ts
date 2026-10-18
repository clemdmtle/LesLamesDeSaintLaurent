import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Couteau } from '../types/couteau.type';
import { Gamme } from '../types/gamme.enum';

const SERVEUR = 'http://localhost:3000';
const API = `${SERVEUR}/api/couteaux`;

@Injectable({
  providedIn: 'root',
})
export class CouteauService {
  private http = inject(HttpClient);
  private couteaux = signal<Couteau[]>([]);

  readonly couteaux$ = this.couteaux.asReadonly();

  chargerCouteaux() {
    this.http.get<any[]>(API).subscribe({
      next: (data) => {
        const couteaux: Couteau[] = data.map(c => {
          const photos = [c.photo_1, c.photo_2, c.photo_3].filter((p): p is string => !!p);
          const images = photos.map(p => `${SERVEUR}${p}`);
          return {
            id: c.id,
            gamme: c.gamme as Gamme,
            lame: c.lame,
            garde: c.garde,
            manche: c.manche,
            etui: c.etui,
            prix: c.prix,
            image: images[0] ?? '',
            images,
            photos,
            estDisponible: !c.vendu,
          };
        });
        this.couteaux.set(couteaux);
      },
      error: (err) => console.error('Erreur lors du chargement des couteaux', err),
    });
  }

  creer(formData: FormData) {
    return this.http
      .post(API, formData, { withCredentials: true })
      .pipe(tap(() => this.chargerCouteaux()));
  }

  modifier(id: number, formData: FormData) {
    return this.http
      .put(`${API}/${id}`, formData, { withCredentials: true })
      .pipe(tap(() => this.chargerCouteaux()));
  }

  supprimer(id: number) {
    return this.http
      .delete(`${API}/${id}`, { withCredentials: true })
      .pipe(tap(() => this.chargerCouteaux()));
  }

  marquerVendu(id: number) {
  return this.http
    .patch(`${API}/${id}/vendu`, {}, { withCredentials: true })
    .pipe(tap(() => this.chargerCouteaux()));
  }
}