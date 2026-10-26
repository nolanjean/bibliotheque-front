import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth';
import { User } from './models/user';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('devrait démarrer non connecté sans token en localStorage', () => {
    expect(service.estConnecte()).toBe(false);
  });

  it('login devrait stocker le token et charger l\'utilisateur', () => {
    const fauxUser: User = { id: 1, nom: 'Jean', email: 'jean@email.com', role: 'ADMIN' };

    service.login({ email: 'jean@email.com', motDePasse: 'test1234' }).subscribe((user) => {
      expect(user.nom).toBe('Jean');
      expect(service.estConnecte()).toBe(true);
      expect(service.estAdmin()).toBe(true);
    });

    const reqLogin = httpMock.expectOne('http://localhost:8080/api/auth/login');
    reqLogin.flush({ token: 'faux-token', role: 'ADMIN' });

    const reqMe = httpMock.expectOne('http://localhost:8080/api/auth/me');
    reqMe.flush(fauxUser);

    expect(localStorage.getItem('auth_token')).toBe('faux-token');
  });

  it('logout devrait retirer le token et réinitialiser l\'état', () => {
    localStorage.setItem('auth_token', 'faux-token');
    service.logout();

    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(service.estConnecte()).toBe(false);
    expect(service.currentUser()).toBeNull();
  });
});