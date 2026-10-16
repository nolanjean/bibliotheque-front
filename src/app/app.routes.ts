import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'livres',
    loadComponent: () => import('./features/livres/livre-liste/livre-liste').then((m) => m.LivreListe),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
  },
  { path: '', redirectTo: 'livres', pathMatch: 'full' },
  {
    path: 'livres/nouveau',
    loadComponent: () => import('./features/livres/livre-formulaire/livre-formulaire').then((m) => m.LivreFormulaire),
  },
  {
    path: 'livres/:id/modifier',
    loadComponent: () => import('./features/livres/livre-formulaire/livre-formulaire').then((m) => m.LivreFormulaire),
  },
  {
    path: 'livres/:id',
    loadComponent: () => import('./features/livres/livre-detail/livre-detail').then((m) => m.LivreDetail),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];