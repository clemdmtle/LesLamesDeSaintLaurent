import { Component, inject } from '@angular/core';
import { Modeles } from "../modeles/modeles";
import { Etuis } from "../etuis/etuis";
import { Matieres } from "../matieres/matieres";
import { BandeauPieces } from "../../components/bandeau-pieces/bandeau-pieces";
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';

@Component({
  selector: 'app-atelier',
  imports: [Modeles, Etuis, Matieres, BandeauPieces],
  templateUrl: './atelier.html',
  styleUrl: './atelier.css',
})
export class Atelier {
  private route = inject(ActivatedRoute);

  constructor() {
    this.route.fragment
      .pipe(distinctUntilChanged())
      .subscribe(fragment => {
        this.scrollToFragment(fragment);
      });
  }

  private scrollToFragment(fragment: string | null) {
    if (!fragment) return;

    // double rAF = attend que le DOM soit peint avant de scroller
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(fragment)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  }
}
