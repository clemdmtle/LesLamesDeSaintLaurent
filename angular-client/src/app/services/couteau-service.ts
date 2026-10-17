import { Injectable, signal, inject } from '@angular/core';
import { Couteau } from '../types/couteau.type';
import { HttpClient } from '@angular/common/http';
import { Gamme } from './../types/gamme.enum';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CouteauService {
  private http = inject(HttpClient);
  private couteaux = signal<Couteau[]>([]);
  
  readonly couteaux$ = this.couteaux.asReadonly();

  chargerCouteaux(){
    this.http.get<any[]>('http://localhost:3000/api/couteaux').subscribe({
      next: (data)=> {
        const couteaux: Couteau[] = data.map(c => ({
          id: c.id,
          gamme: c.gamme as Gamme,
          lame: c.lame,
          garde: c.garde,
          manche: c.manche,
          etui: c.etui,
          prix: c.prix,
          image: c.photo_1,
          estDisponible: !c.vendu
        }));
        this.couteaux.set(couteaux);
      },
      error: (err) => console.error("Erreur lors du chargement des couteaux", err)
    });
  }

  creer(formData: FormData) {
  return this.http
    .post('http://localhost:3000/api/couteaux', formData, { withCredentials: true })
    .pipe(tap(() => this.chargerCouteaux()));
  }
}
