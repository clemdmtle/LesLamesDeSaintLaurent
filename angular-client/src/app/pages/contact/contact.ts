import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ContactService } from '../../services/contact-service';

// À REMPLACER par les vraies coordonnées
const ADRESSE = {
  nom: "Nom de l'atelier",
  rue: '12 rue des Forgerons',
  codePostal: '67000',
  ville: 'Strasbourg',
  telephone: '03 00 00 00 00',
  email: 'contact@exemple.fr',
  horaires: 'Sur rendez-vous',
};

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, InputTextModule, TextareaModule, ButtonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private fb = new FormBuilder();
  private contactService = inject(ContactService);
  private sanitizer = inject(DomSanitizer);

  readonly adresse = ADRESSE;

  envoiEnCours = signal(false);
  succes = signal(false);
  erreur = signal<string | null>(null);

  // Carte Google Maps intégrée, sans clé API
  carteUrl = computed(() => {
    const requete = encodeURIComponent(
      `${ADRESSE.rue}, ${ADRESSE.codePostal} ${ADRESSE.ville}`
    );
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps?q=${requete}&output=embed`
    );
  });

  // Lien pour ouvrir l'itinéraire dans l'application Maps
  itineraireUrl = computed(() => {
    const requete = encodeURIComponent(
      `${ADRESSE.rue}, ${ADRESSE.codePostal} ${ADRESSE.ville}`
    );
    return `https://www.google.com/maps/dir/?api=1&destination=${requete}`;
  });

  contactForm = this.fb.nonNullable.group({
    nom: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    sujet: ['', [Validators.required, Validators.maxLength(150)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]],
    siteWeb: [''], // honeypot : invisible pour les humains
  });

  envoyer() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.envoiEnCours.set(true);
    this.erreur.set(null);
    this.succes.set(false);

    this.contactService.envoyer(this.contactForm.getRawValue()).subscribe({
      next: () => {
        this.envoiEnCours.set(false);
        this.succes.set(true);
        this.contactForm.reset();
      },
      error: (err) => {
        this.envoiEnCours.set(false);
        this.erreur.set(err.error?.message || "Erreur lors de l'envoi du message.");
      },
    });
  }
}