import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected readonly erreur = signal<string | null>(null);

  protected readonly form = this.fb.group({
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.erreur.set(null);
    const data = this.form.getRawValue() as { nom: string; email: string; motDePasse: string };

    this.authService.register(data).subscribe({
      next: () => {
        this.authService.login({ email: data.email, motDePasse: data.motDePasse }).subscribe({
          next: () => this.router.navigate(['/livres']),
          error: () => this.router.navigate(['/login']),
        });
      },
      error: () => this.erreur.set('Cet email est peut-être déjà utilisé.'),
    });
  }
}