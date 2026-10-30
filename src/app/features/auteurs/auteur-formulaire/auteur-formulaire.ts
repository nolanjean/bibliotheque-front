import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuteurService } from '../auteur';
import { NotificationService } from '../../../core/notification';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-auteur-formulaire',
  styleUrl: './auteur-formulaire.css',
  templateUrl: './auteur-formulaire.html',
})
export class AuteurFormulaire implements OnInit {
  private fb = inject(FormBuilder);
  private auteurService = inject(AuteurService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  protected readonly erreur = signal<string | null>(null);
  protected readonly auteurId = signal<number | null>(null);

  protected readonly form = this.fb.group({
    nom: ['', Validators.required],
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.auteurId.set(id);

      this.auteurService.getAuteur(id).subscribe({
        next: (auteur) => this.form.patchValue({ nom: auteur.nom }),
        error: () => this.erreur.set('Auteur introuvable.'),
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.erreur.set(null);
    const data = this.form.getRawValue() as { nom: string };

    const id = this.auteurId();
    const requete = id
      ? this.auteurService.updateAuteur(id, data)
      : this.auteurService.createAuteur(data);

    requete.subscribe({
      next: () => {
        this.notificationService.succes(id ? 'Auteur modifié.' : 'Auteur créé.');
        this.router.navigate(['/auteurs']);
      },
      error: (err) => {
        const messages = err.error ? Object.values(err.error) : [];
        this.erreur.set(messages.length > 0 ? messages.join(' ') : "Erreur lors de l'enregistrement de l'auteur.");
      },
    });
  }
}