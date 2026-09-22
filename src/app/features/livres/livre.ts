import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from '../../core/models/livre';
import { Page } from '../../core/models/page';

@Injectable({
  providedIn: 'root',
})
export class LivreService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/livres';

  getLivres(): Observable<Page<Livre>> {
    return this.http.get<Page<Livre>>(this.baseUrl);
  }
}