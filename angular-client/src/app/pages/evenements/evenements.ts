import { Component, inject, OnInit, computed } from '@angular/core';
import { CardSalon } from "../../components/card-salon/card-salon";
import { EvenementService } from '../../services/evenement-service';

@Component({
  selector: 'app-evenements',
  imports: [CardSalon],
  templateUrl: './evenements.html',
  styleUrl: './evenements.css',
})
export class Evenements implements OnInit {
  evenementService = inject(EvenementService);

  ngOnInit(): void {
    this.evenementService.chargerEvenements();
  }

  tabs = computed(() => {
    return this.evenementService.evenements$();
  })
}
