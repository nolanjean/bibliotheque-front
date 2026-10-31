import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Page } from '../../core/models/page';
import { Membre } from '../../core/models/membre';

export interface FiltresMembres {
  q?: string;
  sort?: string;
}


@Injectable({
  providedIn: 'root',
})
export class MembreService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/membres`;

  getMembres(page = 0, size = 20, filtres: FiltresMembres = {}): Observable<Page<Membre>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (filtres.q) {
      params = params.set('q', filtres.q);
    }
    if (filtres.sort) {
      params = params.set('sort', filtres.sort);
    }

    return this.http.get<Page<Membre>>(this.baseUrl, { params });
  }

  getMembre(id: number): Observable<Membre> {
    return this.http.get<Membre>(`${this.baseUrl}/${id}`);
  }

  updateMembre(id: number, data: { nom: string; email: string }): Observable<Membre> {
    return this.http.put<Membre>(`${this.baseUrl}/${id}`, data);
  }

  deleteMembre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}