import { Routes } from '@angular/router';
import { LivreListe } from './features/livres/livre-liste/livre-liste';

export const routes: Routes = [
  { path: 'livres', component: LivreListe },
  { path: '', redirectTo: 'livres', pathMatch: 'full' },
];