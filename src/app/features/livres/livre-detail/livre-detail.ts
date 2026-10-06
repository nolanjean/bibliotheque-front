import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LivreService } from '../livre';
import { Livre } from '../../../core/models/livre';

@Component({
  imports: [RouterLink],
  selector: 'app-livre-detail',
  styleUrl: './livre-detail.css',
  templateUrl: './livre-detail.html',
})
export class LivreDetail {
  private livreService = inject(LivreService);
  private route = inject(ActivatedRoute);

  protected readonly livre = signal<Livre | null>(null);
  protected readonly chargement = signal(true);
  protected readonly erreur = signal<string | null>(null);

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
}