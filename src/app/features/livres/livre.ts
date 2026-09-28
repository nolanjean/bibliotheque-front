import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getLivres(): Observable<Page<Livre>> {
    return this.http.get<Page<Livre>>(this.baseUrl);
  }
}