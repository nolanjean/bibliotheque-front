import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpruntService } from '../emprunt';
import { MembreService } from '../../membres/membre';
import { LivreService } from '../../livres/livre';
import { Membre } from '../../../core/models/membre';
import { Livre } from '../../../core/models/livre';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-emprunt-formulaire',
  styleUrl: './emprunt-formulaire.css',
  templateUrl: './emprunt-formulaire.html',
})
export class EmpruntFormulaire implements OnInit {
  private fb = inject(FormBuilder);
  private empruntService = inject(EmpruntService);
  private membreService = inject(MembreService);
  private livreService = inject(LivreService);
  private router = inject(Router);

  protected readonly membres = signal<Membre[]>([]);
  protected readonly livres = signal<Livre[]>([]);
  protected readonly erreur = signal<string | null>(null);

  protected readonly form = this.fb.group({
    membreId: [null as number | null, Validators.required],
    livreId: [null as number | null, Validators.required],
  });

  ngOnInit(): void {
    this.membreService.getMembres().subscribe({
      next: (membres) => this.membres.set(membres),
      error: () => this.erreur.set('Impossible de charger les membres.'),
    });

    this.livreService.getLivres(0, 100).subscribe({
      next: (page) => this.livres.set(page.content),
      error: () => this.erreur.set('Impossible de charger les livres.'),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.erreur.set(null);
    const { membreId, livreId } = this.form.getRawValue() as { membreId: number; livreId: number };

    this.empruntService.createEmprunt(membreId, livreId).subscribe({
      next: () => this.router.navigate(['/emprunts']),
      error: (err) => {
        const messages = err.error ? Object.values(err.error) : [];
        this.erreur.set(messages.length > 0 ? messages.join(' ') : "Erreur lors de la création de l'emprunt.");
      },
    });
  }
}