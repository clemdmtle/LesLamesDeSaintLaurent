import { Injectable, signal } from '@angular/core';
import { Couteau } from '../types/couteau.type';

@Injectable({
  providedIn: 'root',
})
export class CouteauService {
  private couteaux = signal<Couteau[]>([]);
  
  readonly couteaux$ = this.couteaux.asReadonly();

  ajouter(couteau: Couteau) {
    this.couteaux.update(list => [...list, couteau]);
  }
}
