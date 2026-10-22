import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Page } from '../../core/models/page';
import { Emprunt } from '../../core/models/emprunt';

@Injectable({
  providedIn: 'root',
})
export class EmpruntService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/emprunts`;

  getEmprunts(): Observable<Page<Emprunt>> {
    const params = new HttpParams().set('size', 50);
    return this.http.get<Page<Emprunt>>(this.baseUrl, { params });
  }

  getEmpruntsDuMembre(membreId: number): Observable<Page<Emprunt>> {
    return this.http.get<Page<Emprunt>>(`${this.baseUrl}/membre/${membreId}`);
  }

  getEmprunt(id: number): Observable<Emprunt> {
    return this.http.get<Emprunt>(`${this.baseUrl}/${id}`);
  }

  getMesEmprunts(): Observable<Page<Emprunt>> {
    return this.http.get<Page<Emprunt>>(`${this.baseUrl}/mes-emprunts`);
  }

  rendreEmprunt(id: number): Observable<Emprunt> {
    return this.http.put<Emprunt>(`${this.baseUrl}/${id}/rendre`, {});
  }

  createEmprunt(livreId: number, membreId?: number): Observable<Emprunt> {
  let params = new HttpParams().set('livreId', livreId);
  if (membreId) {
    params = params.set('membreId', membreId);
  }
  return this.http.post<Emprunt>(this.baseUrl, null, { params });
}
}