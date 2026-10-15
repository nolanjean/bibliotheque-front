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
}