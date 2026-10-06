import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from '../../core/models/livre';
import { Page } from '../../core/models/page';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LivreService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/livres`;

  getLivres(page = 0, size = 5): Observable<Page<Livre>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<Livre>>(this.baseUrl, { params });
  }

    getLivre(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.baseUrl}/${id}`);
  }
}