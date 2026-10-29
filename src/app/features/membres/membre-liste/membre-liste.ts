import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MembreService } from '../membre';
import { Membre } from '../../../core/models/membre';

@Component({
  imports: [RouterLink],
  selector: 'app-membre-liste',
  styleUrl: './membre-liste.css',
  templateUrl: './membre-liste.html',
})
export class MembreListe {
  private membreService = inject(MembreService);

  protected readonly membres = signal<Membre[]>([]);
  protected readonly chargement = signal(true);
  protected readonly erreur = signal<string | null>(null);
  protected readonly pageActuelle = signal(0);
  protected readonly totalPages = signal(0);

  constructor() {
    this.chargerPage(0);
  }

  private chargerPage(page: number): void {
    this.chargement.set(true);
    this.membreService.getMembres(page).subscribe({
      next: (result) => {
        this.membres.set(result.content);
        this.pageActuelle.set(result.page.number);
        this.totalPages.set(result.page.totalPages);
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set('Impossible de charger les membres.');
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