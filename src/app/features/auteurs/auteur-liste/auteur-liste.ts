import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuteurService } from '../auteur';
import { Auteur } from '../../../core/models/auteur';

@Component({
  imports: [RouterLink],
  selector: 'app-auteur-liste',
  styleUrl: './auteur-liste.css',
  templateUrl: './auteur-liste.html',
})
export class AuteurListe {
  private auteurService = inject(AuteurService);

  protected readonly auteurs = signal<Auteur[]>([]);
  protected readonly chargement = signal(true);
  protected readonly erreur = signal<string | null>(null);

  constructor() {
    this.auteurService.getAuteurs().subscribe({
      next: (page) => {
        this.auteurs.set(page.content);
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set('Impossible de charger les auteurs.');
        this.chargement.set(false);
      },
    });
  }
}