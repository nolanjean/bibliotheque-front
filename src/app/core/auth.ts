import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './models/auth';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/auth';
  private readonly tokenKey = 'auth_token';

  readonly estConnecte = signal<boolean>(this.hasToken());
  readonly currentUser = signal<User | null>(null);
  readonly estAdmin = computed(() => this.currentUser()?.role === 'ADMIN');

  constructor() {
    if (this.hasToken()) {
      setTimeout(() => {
        this.getMe().subscribe({ error: () => this.logout() });
      });
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      switchMap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.estConnecte.set(true);
        return this.getMe();
      })
    );
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, data);
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`).pipe(tap((user) => this.currentUser.set(user)));
  }

  logout(): void {
  localStorage.removeItem(this.tokenKey);
  this.estConnecte.set(false);
  this.currentUser.set(null);
}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}