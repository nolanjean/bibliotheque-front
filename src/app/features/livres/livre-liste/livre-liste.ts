import { Component, inject, signal } from '@angular/core';
import { LivreService } from '../livre';
import { Livre } from '../../../core/models/livre';

@Component({
  imports: [],
  selector: 'app-livre-liste',
  styleUrl: './livre-liste.css',
  templateUrl: './livre-liste.html',
})
export class LivreListe {
  private livreService = inject(LivreService);

  protected readonly livres = signal<Livre[]>([]);
  protected readonly chargement = signal(true);
  protected readonly erreur = signal<string | null>(null);
  protected readonly pageActuelle = signal(0);
  protected readonly totalPages = signal(0);

  constructor() {
    this.chargerPage(0);
  }

  private chargerPage(page: number): void {
    this.chargement.set(true);
    this.erreur.set(null);

    this.livreService.getLivres(page).subscribe({
      next: (result) => {
        this.livres.set(result.content);
        this.pageActuelle.set(result.number);
        this.totalPages.set(result.totalPages);
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set('Impossible de charger les livres.');
        this.chargement.set(false);
      },
    });
  }

  pagePrecedente(): void {
    if (this.pageActuelle() > 0) {
      this.chargerPage(this.pageActuelle() - 1);
    }
  }

  pageSuivante(): void {
    if (this.pageActuelle() < this.totalPages() - 1) {
      this.chargerPage(this.pageActuelle() + 1);
    }
  }
}