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

  constructor() {
    this.membreService.getMembres().subscribe({
      next: (page) => {
        this.membres.set(page.content);
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set('Impossible de charger les membres.');
        this.chargement.set(false);
      },
    });
  }
}