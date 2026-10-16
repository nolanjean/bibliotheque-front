import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MembreService } from '../membre';
import { Membre } from '../../../core/models/membre';

@Component({
  imports: [RouterLink],
  selector: 'app-membre-detail',
  styleUrl: './membre-detail.css',
  templateUrl: './membre-detail.html',
})
export class MembreDetail {
  private membreService = inject(MembreService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected readonly membre = signal<Membre | null>(null);
  protected readonly chargement = signal(true);
  protected readonly erreur = signal<string | null>(null);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.membreService.getMembre(id).subscribe({
      next: (membre) => {
        this.membre.set(membre);
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set('Membre introuvable.');
        this.chargement.set(false);
      },
    });
  }

  supprimer(): void {
    const membre = this.membre();
    if (!membre) {
      return;
    }

    if (!confirm(`Supprimer le membre "${membre.nom}" ? Cette action est irréversible.`)) {
      return;
    }

    this.membreService.deleteMembre(membre.id).subscribe({
      next: () => this.router.navigate(['/membres']),
      error: () => this.erreur.set('Impossible de supprimer ce membre.'),
    });
  }
}