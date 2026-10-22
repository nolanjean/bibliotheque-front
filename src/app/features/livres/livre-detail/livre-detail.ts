import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LivreService } from '../livre';
import { Livre } from '../../../core/models/livre';
import { IsbnFormatPipe } from '../../../shared/isbn-format-pipe';
import { AuthService } from '../../../core/auth';

@Component({
  imports: [RouterLink, IsbnFormatPipe],
  selector: 'app-livre-detail',
  styleUrl: './livre-detail.css',
  templateUrl: './livre-detail.html',
})
export class LivreDetail {
  private livreService = inject(LivreService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected readonly livre = signal<Livre | null>(null);
  protected readonly chargement = signal(true);
  protected readonly erreur = signal<string | null>(null);
  protected authService = inject(AuthService);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.livreService.getLivre(id).subscribe({
      next: (livre) => {
        this.livre.set(livre);
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set('Livre introuvable.');
        this.chargement.set(false);
      },
    });
  }

  supprimer(): void {
    const livre = this.livre();
    if (!livre) {
      return;
    }

    if (!confirm(`Supprimer "${livre.titre}" ? Cette action est irréversible.`)) {
      return;
    }

    this.livreService.deleteLivre(livre.id).subscribe({
      next: () => this.router.navigate(['/livres']),
      error: () => this.erreur.set('Impossible de supprimer ce livre.'),
    });
  }
}