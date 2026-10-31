import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpruntService } from '../emprunt';
import { MembreService } from '../../membres/membre';
import { LivreService } from '../../livres/livre';
import { AuthService } from '../../../core/auth';
import { Membre } from '../../../core/models/membre';
import { Livre } from '../../../core/models/livre';
import { NotificationService } from '../../../core/notification';
import { messageErreur } from '../../../core/messages-erreur';

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
  protected authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  protected readonly membres = signal<Membre[]>([]);
  protected readonly livres = signal<Livre[]>([]);
  protected readonly erreur = signal<string | null>(null);

  protected readonly form = this.fb.group({
    membreId: [null as number | null],
    livreId: [null as number | null, Validators.required],
  });

  ngOnInit(): void {
    if (this.authService.estAdmin()) {
      this.membreService.getMembres(0, 100).subscribe({
        next: (page) => this.membres.set(page.content),
        error: () => this.erreur.set('Impossible de charger les membres.'),
      });
    }

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
    const { membreId, livreId } = this.form.getRawValue() as { membreId: number | null; livreId: number };

    const requete = this.authService.estAdmin() && membreId
      ? this.empruntService.createEmprunt(livreId, membreId)
      : this.empruntService.createEmprunt(livreId);

    requete.subscribe({
      next: () => {
        this.notificationService.succes('Emprunt créé.');
        this.router.navigate(['/emprunts']);
      },
      error: (err) => {
        this.erreur.set(messageErreur(err, "Erreur lors de la création de l'emprunt."));
      },
    });
  }
}