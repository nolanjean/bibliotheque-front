import { Routes } from '@angular/router';
import { LivreListe } from './features/livres/livre-liste/livre-liste';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
  { path: 'livres', component: LivreListe },
  { path: 'login', component: Login },
  { path: '', redirectTo: 'livres', pathMatch: 'full' },
];