import { Component, inject, signal, OnInit } from '@angular/core';
import { LivreService } from '../livre';
import { Livre } from '../../../core/models/livre';

@Component({
  imports: [],
  selector: 'app-livre-liste',
  styleUrl: './livre-liste.css',
  templateUrl: './livre-liste.html',
})
export class LivreListe implements OnInit {
  private livreService = inject(LivreService);

  protected readonly livres = signal<Livre[]>([]);
  protected readonly chargement = signal(true);
  protected readonly erreur = signal<string | null>(null);

  ngOnInit(): void {
    this.livreService.getLivres().subscribe({
      next: (page) => {
        this.livres.set(page.content);
        this.chargement.set(false);
      },
      error: (err) => {
        this.erreur.set('Impossible de charger les livres.');
        this.chargement.set(false);
      },
    });
  }
}