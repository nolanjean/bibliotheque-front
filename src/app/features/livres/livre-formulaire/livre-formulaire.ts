import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreService } from '../livre';
import { AuteurService } from '../../auteurs/auteur';
import { Auteur } from '../../../core/models/auteur';
import { NotificationService } from '../../../core/notification';
import { messageErreur } from '../../../core/messages-erreur';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-livre-formulaire',
  styleUrl: './livre-formulaire.css',
  templateUrl: './livre-formulaire.html',
})
export class LivreFormulaire implements OnInit {
  private fb = inject(FormBuilder);
  private livreService = inject(LivreService);
  private auteurService = inject(AuteurService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  protected readonly auteurs = signal<Auteur[]>([]);
  protected readonly erreur = signal<string | null>(null);
  protected readonly livreId = signal<number | null>(null);
  protected readonly auteurNomActuel = signal<string | null>(null);

  protected readonly form = this.fb.group({
    titre: ['', Validators.required],
    isbn: ['', Validators.required],
    nombreExemplaires: [1, [Validators.required, Validators.min(0)]],
    auteurId: [null as number | null, Validators.required],
  });

  ngOnInit(): void {
  this.auteurService.getAuteurs().subscribe({
    next: (page) => {
      this.auteurs.set(page.content);
      this.preselectionnerAuteur();
    },
    error: () => this.erreur.set('Impossible de charger les auteurs.'),
  });

  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    const id = Number(idParam);
    this.livreId.set(id);

    this.livreService.getLivre(id).subscribe({
      next: (livre) => {
        this.auteurNomActuel.set(livre.auteurNom);
        this.form.patchValue({
          titre: livre.titre,
          isbn: livre.isbn,
          nombreExemplaires: livre.nombreExemplaires,
        });
        this.preselectionnerAuteur();
      },
      error: () => this.erreur.set('Livre introuvable.'),
    });
  }
}

private preselectionnerAuteur(): void {
  const nomActuel = this.auteurNomActuel();
  if (!nomActuel || this.auteurs().length === 0) {
    return;
  }

  const auteurTrouve = this.auteurs().find((a) => a.nom === nomActuel);
  if (auteurTrouve) {
    this.form.patchValue({ auteurId: auteurTrouve.id });
  }
}

  onSubmit(): void {
  if (this.form.invalid) {
    return;
  }

  this.erreur.set(null);
  const data = this.form.getRawValue() as {
    titre: string;
    isbn: string;
    nombreExemplaires: number;
    auteurId: number;
  };
  data.isbn = data.isbn.replace(/[^0-9]/g, '');

  const id = this.livreId();
  const requete = id
    ? this.livreService.updateLivre(id, data)
    : this.livreService.createLivre(data);

  requete.subscribe({
    next: (livre) => {
      this.notificationService.succes(id ? 'Livre modifié.' : 'Livre créé.');
      this.router.navigate(['/livres', livre.id]);
    },
    error: (err) => {
      this.erreur.set(messageErreur(err, "Erreur lors de l'enregistrement du livre."));
    },
  });
}
}