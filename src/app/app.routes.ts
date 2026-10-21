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
    path: 'auteurs',
    loadComponent: () => import('./features/auteurs/auteur-liste/auteur-liste').then((m) => m.AuteurListe),
  },
  {
    path: 'auteurs/nouveau',
    loadComponent: () => import('./features/auteurs/auteur-formulaire/auteur-formulaire').then((m) => m.AuteurFormulaire),
  },
  {
    path: 'auteurs/:id/modifier',
    loadComponent: () => import('./features/auteurs/auteur-formulaire/auteur-formulaire').then((m) => m.AuteurFormulaire),
  },
  {
  path: 'membres',
  loadComponent: () => import('./features/membres/membre-liste/membre-liste').then((m) => m.MembreListe),
},
{
  path: 'membres/:id',
  loadComponent: () => import('./features/membres/membre-detail/membre-detail').then((m) => m.MembreDetail),
},
{
  path: 'membres/:id/modifier',
  loadComponent: () => import('./features/membres/membre-formulaire/membre-formulaire').then((m) => m.MembreFormulaire),
},
{
  path: 'emprunts',
  loadComponent: () => import('./features/emprunts/emprunt-liste/emprunt-liste').then((m) => m.EmpruntListe),
},
{
  path: 'emprunts/nouveau',
  loadComponent: () => import('./features/emprunts/emprunt-formulaire/emprunt-formulaire').then((m) => m.EmpruntFormulaire),
},
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];