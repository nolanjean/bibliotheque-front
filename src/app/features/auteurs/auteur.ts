import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Page } from '../../core/models/page';
import { Auteur } from '../../core/models/auteur';

@Injectable({
  providedIn: 'root',
})
export class AuteurService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/auteurs`;

  getAuteurs(): Observable<Page<Auteur>> {
    const params = new HttpParams().set('size', 100);
    return this.http.get<Page<Auteur>>(this.baseUrl, { params });
  }

  getAuteur(id: number): Observable<Auteur> {
  return this.http.get<Auteur>(`${this.baseUrl}/${id}`);
}

  createAuteur(data: { nom: string }): Observable<Auteur> {
    return this.http.post<Auteur>(this.baseUrl, data);
  }

  updateAuteur(id: number, data: { nom: string }): Observable<Auteur> {
    return this.http.put<Auteur>(`${this.baseUrl}/${id}`, data);
  }

  deleteAuteur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}