import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmpruntService } from '../emprunt';
import { Emprunt } from '../../../core/models/emprunt';

@Component({
  imports: [RouterLink],
  selector: 'app-emprunt-liste',
  styleUrl: './emprunt-liste.css',
  templateUrl: './emprunt-liste.html',
})
export class EmpruntListe {
  private empruntService = inject(EmpruntService);

  protected readonly emprunts = signal<Emprunt[]>([]);
  protected readonly chargement = signal(true);
  protected readonly erreur = signal<string | null>(null);

  constructor() {
    this.charger();
  }

  private charger(): void {
    this.chargement.set(true);
    this.empruntService.getEmprunts().subscribe({
      next: (page) => {
        this.emprunts.set(page.content);
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set('Impossible de charger les emprunts.');
        this.chargement.set(false);
      },
    });
  }

  rendre(id: number): void {
    this.empruntService.rendreEmprunt(id).subscribe({
      next: () => this.charger(),
      error: () => this.erreur.set("Impossible de marquer cet emprunt comme rendu."),
    });
  }
}