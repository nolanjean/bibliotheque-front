import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { EMPTY, Subject, catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { MembreService, FiltresMembres } from '../membre';
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

  protected readonly recherche = signal('');
  protected readonly tri = signal('nom,asc');

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
          this.membreService.getMembres(page, 10, this.filtres()).pipe(
            catchError(() => {
              this.erreur.set('Impossible de charger les membres.');
              this.chargement.set(false);
              return EMPTY;
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((result) => {
        this.membres.set(result.content);
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

    this.demandePage$.next(0);
  }

  private filtres(): FiltresMembres {
    return {
      q: this.recherche() || undefined,
      sort: this.tri(),
    };
  }

  onRecherche(event: Event): void {
    this.saisie$.next((event.target as HTMLInputElement).value);
  }

  onTriChange(event: Event): void {
    this.tri.set((event.target as HTMLSelectElement).value);
    this.demandePage$.next(0);
  }

  reinitialiser(): void {
    this.recherche.set('');
    this.tri.set('nom,asc');
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