import { Injectable, signal, inject } from '@angular/core';
import { Couteau } from '../types/couteau.type';
import { HttpClient } from '@angular/common/http';

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
          gamme: c.gamme,
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

  ajouter(couteau: Couteau) {
    this.couteaux.update(list => [...list, couteau]);
  }
}
