import { Routes } from '@angular/router';
import { LivreListe } from './features/livres/livre-liste/livre-liste';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { LivreDetail } from './features/livres/livre-detail/livre-detail';
import { LivreFormulaire } from './features/livres/livre-formulaire/livre-formulaire';
import { NotFound } from './features/not-found/not-found';


export const routes: Routes = [
  { path: 'livres', component: LivreListe },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '', redirectTo: 'livres', pathMatch: 'full' },
  { path: 'livres/nouveau', component: LivreFormulaire },
  { path: 'livres/:id/modifier', component: LivreFormulaire },
  { path: 'livres/:id', component: LivreDetail },
  { path: '**', component: NotFound },
];