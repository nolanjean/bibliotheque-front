import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LivreService, FiltresLivres } from '../livre';
import { AuteurService } from '../../auteurs/auteur';
import { AuthService } from '../../../core/auth';
import { Livre } from '../../../core/models/livre';
import { Auteur } from '../../../core/models/auteur';
import { IsbnFormatPipe } from '../../../shared/isbn-format-pipe';

@Component({
  imports: [RouterLink, IsbnFormatPipe],
  selector: 'app-livre-liste',
  styleUrl: './livre-liste.css',
  templateUrl: './livre-liste.html',
})
export class LivreListe {
  private livreService = inject(LivreService);
  private auteurService = inject(AuteurService);
  protected authService = inject(AuthService);

  protected readonly livres = signal<Livre[]>([]);
  protected readonly auteurs = signal<Auteur[]>([]);
  protected readonly chargement = signal(true);
  protected readonly erreur = signal<string | null>(null);
  protected readonly pageActuelle = signal(0);
  protected readonly totalPages = signal(0);

  protected readonly recherche = signal('');
  protected readonly auteurFiltre = signal<number | null>(null);
  protected readonly tri = signal('id,asc');

  constructor() {
    this.auteurService.getAuteurs().subscribe({
      next: (page) => this.auteurs.set(page.content),
    });
    this.chargerPage(0);
  }

  private chargerPage(page: number): void {
    this.chargement.set(true);
    this.erreur.set(null);

    const filtres: FiltresLivres = {
      q: this.recherche() || undefined,
      auteurId: this.auteurFiltre() ?? undefined,
      sort: this.tri(),
    };

    this.livreService.getLivres(page, 5, filtres).subscribe({
      next: (result) => {
        this.livres.set(result.content);
        this.pageActuelle.set(result.page.number);
        this.totalPages.set(result.page.totalPages);
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set('Impossible de charger les livres.');
        this.chargement.set(false);
      },
    });
  }

  onRecherche(event: Event): void {
    this.recherche.set((event.target as HTMLInputElement).value);
    this.chargerPage(0);
  }

  onAuteurChange(event: Event): void {
    const valeur = (event.target as HTMLSelectElement).value;
    this.auteurFiltre.set(valeur ? Number(valeur) : null);
    this.chargerPage(0);
  }

  onTriChange(event: Event): void {
    this.tri.set((event.target as HTMLSelectElement).value);
    this.chargerPage(0);
  }

  reinitialiser(): void {
    this.recherche.set('');
    this.auteurFiltre.set(null);
    this.tri.set('id,asc');
    this.chargerPage(0);
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