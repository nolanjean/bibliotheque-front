import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { EMPTY, Subject, catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
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

  private readonly demandePage$ = new Subject<number>();
  private readonly saisie$ = new Subject<string>();

  constructor() {
    this.demandePage$
      .pipe(
        tap(() => {
          this.chargement.set(true);
          this.erreur.set(null);
        }),
        switchMap((page) =>
          this.livreService.getLivres(page, 5, this.filtres()).pipe(
            catchError(() => {
              this.erreur.set('Impossible de charger les livres.');
              this.chargement.set(false);
              return EMPTY;
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((result) => {
        this.livres.set(result.content);
        this.pageActuelle.set(result.page.number);
        this.totalPages.set(result.page.totalPages);
        this.chargement.set(false);
      });

    this.saisie$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((texte) => {
        this.recherche.set(texte);
        this.demandePage$.next(0);
      });

    this.auteurService.getAuteurs().subscribe({
      next: (page) => this.auteurs.set(page.content),
      error: () => this.auteurs.set([]),
    });

    this.demandePage$.next(0);
  }

  private filtres(): FiltresLivres {
    return {
      q: this.recherche() || undefined,
      auteurId: this.auteurFiltre() ?? undefined,
      sort: this.tri(),
    };
  }

  onRecherche(event: Event): void {
    this.saisie$.next((event.target as HTMLInputElement).value);
  }

  onAuteurChange(event: Event): void {
    const valeur = (event.target as HTMLSelectElement).value;
    this.auteurFiltre.set(valeur ? Number(valeur) : null);
    this.demandePage$.next(0);
  }

  onTriChange(event: Event): void {
    this.tri.set((event.target as HTMLSelectElement).value);
    this.demandePage$.next(0);
  }

  reinitialiser(): void {
    this.recherche.set('');
    this.auteurFiltre.set(null);
    this.tri.set('id,asc');
    this.demandePage$.next(0);
  }

  pagePrecedente(): void {
    if (this.pageActuelle() > 0) {
      this.demandePage$.next(this.pageActuelle() - 1);
    }
  }

  pageSuivante(): void {
    if (this.pageActuelle() < this.totalPages() - 1) {
      this.demandePage$.next(this.pageActuelle() + 1);
    }
  }
}