import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Membre } from '../../core/models/membre';


@Injectable({
  providedIn: 'root',
})
export class MembreService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/membres`;

  getMembres(): Observable<Membre[]> {
  return this.http.get<Membre[]>(this.baseUrl);
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