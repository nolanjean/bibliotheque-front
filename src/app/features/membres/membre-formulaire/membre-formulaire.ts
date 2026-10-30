import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembreService } from '../membre';
import { NotificationService } from '../../../core/notification';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-membre-formulaire',
  styleUrl: './membre-formulaire.css',
  templateUrl: './membre-formulaire.html',
})
export class MembreFormulaire implements OnInit {
  private fb = inject(FormBuilder);
  private membreService = inject(MembreService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  protected readonly erreur = signal<string | null>(null);
  protected readonly membreId = signal<number | null>(null);

  protected readonly form = this.fb.group({
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.membreId.set(id);

    this.membreService.getMembre(id).subscribe({
      next: (membre) => this.form.patchValue({ nom: membre.nom, email: membre.email }),
      error: () => this.erreur.set('Membre introuvable.'),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.erreur.set(null);
    const data = this.form.getRawValue() as { nom: string; email: string };
    const id = this.membreId();

    if (!id) {
      return;
    }

    this.membreService.updateMembre(id, data).subscribe({
      next: (membre) => {
        this.notificationService.succes('Membre modifié.');
        this.router.navigate(['/membres', membre.id]);
      },
      error: (err) => {
        const messages = err.error ? Object.values(err.error) : [];
        this.erreur.set(messages.length > 0 ? messages.join(' ') : "Erreur lors de l'enregistrement du membre.");
      },
    });
  }
}