import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre, LivreRequest } from '../../core/models/livre';
import { Page } from '../../core/models/page';
import { environment } from '../../../environments/environment';


export interface FiltresLivres {
  q?: string;
  auteurId?: number;
  sort?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LivreService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/livres`;

  getLivres(page = 0, size = 5, filtres: FiltresLivres = {}): Observable<Page<Livre>> {
  let params = new HttpParams().set('page', page).set('size', size);

  if (filtres.q) {
    params = params.set('q', filtres.q);
  }
  if (filtres.auteurId) {
    params = params.set('auteurId', filtres.auteurId);
  }
  if (filtres.sort) {
    params = params.set('sort', filtres.sort);
  }

  return this.http.get<Page<Livre>>(this.baseUrl, { params });
}

  getLivre(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.baseUrl}/${id}`);
  }

  createLivre(data: LivreRequest): Observable<Livre> {
  return this.http.post<Livre>(this.baseUrl, data);
  }
  updateLivre(id: number, data: LivreRequest): Observable<Livre> {
    return this.http.put<Livre>(`${this.baseUrl}/${id}`, data);
  }
  deleteLivre(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
}
}

