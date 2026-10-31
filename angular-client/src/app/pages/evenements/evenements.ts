import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CardSalon } from '../../components/card-salon/card-salon';
import { EvenementService } from '../../services/evenement-service';
import { AuthService } from '../../services/auth-service';
import { Evenement } from '../../types/evenement.type';
import { ButtonTypeEnum, Button } from '../../components/button/button';
import { ModalEvenement } from '../../components/modal-evenement/modal-evenement';

// Date du jour au format yyyy-MM-dd, en heure locale
// (toISOString() utilise l'UTC et peut décaler d'un jour)
function aujourdhui(): string {
  const d = new Date();
  const mois = String(d.getMonth() + 1).padStart(2, '0');
  const jour = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mois}-${jour}`;
}

@Component({
  selector: 'app-evenements',
  imports: [CardSalon, Button, ModalEvenement],
  templateUrl: './evenements.html',
  styleUrl: './evenements.css',
})
export class Evenements implements OnInit {
  evenementService = inject(EvenementService);
  authService = inject(AuthService);
  isModalVisible = signal<boolean>(false);
  evenementEnEdition = signal<Evenement | null>(null);
  readonly ButtonTypeEnum = ButtonTypeEnum;

  // À venir (aujourd'hui inclus) : du plus proche au plus lointain
  evenementsAVenir = computed(() => {
    const today = aujourdhui();
    return this.evenementService.evenements$()
      .filter(e => e.date && e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date) || a.heure.localeCompare(b.heure));
  });

  // Passés (ou sans date) : du plus récent au plus ancien
  evenementsPasses = computed(() => {
    const today = aujourdhui();
    return this.evenementService.evenements$()
      .filter(e => !e.date || e.date < today)
      .sort((a, b) => b.date.localeCompare(a.date));
  });

  ngOnInit() {
    this.evenementService.chargerEvenements();
  }

  // Création : modale vide
  openModal() {
    this.evenementEnEdition.set(null);
    this.isModalVisible.set(true);
  }

  // Modification : modale pré-remplie avec l'évènement choisi
  modifierEvenement(evenement: Evenement) {
    this.evenementEnEdition.set(evenement);
    this.isModalVisible.set(true);
  }

  supprimerEvenement(evenement: Evenement) {
    if (!confirm(`Supprimer définitivement l'évènement « ${evenement.titre} » ?`)) {
      return;
    }
    this.evenementService.supprimer(evenement.id).subscribe({
      error: (err) => alert(err.error?.message || 'Erreur lors de la suppression.'),
    });
  }
}