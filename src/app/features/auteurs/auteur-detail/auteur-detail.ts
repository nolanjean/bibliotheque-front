import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth';
import { AuteurService } from '../auteur';
import { Auteur } from '../../../core/models/auteur';

@Component({
  imports: [RouterLink],
  selector: 'app-auteur-detail',
  styleUrl: './auteur-detail.css',
  templateUrl: './auteur-detail.html',
})
export class AuteurDetail {
  private auteurService = inject(AuteurService);
  private route = inject(ActivatedRoute);
  protected authService = inject(AuthService);

  protected readonly auteur = signal<Auteur | null>(null);
  protected readonly chargement = signal(true);
  protected readonly erreur = signal<string | null>(null);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.auteurService.getAuteur(id).subscribe({
      next: (auteur) => {
        this.auteur.set(auteur);
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set('Auteur introuvable.');
        this.chargement.set(false);
      },
    });
  }
}