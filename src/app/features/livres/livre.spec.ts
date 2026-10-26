import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { LivreService } from './livre';
import { Livre } from '../../core/models/livre';
import { Page } from '../../core/models/page';
import { environment } from '../../../environments/environment';

describe('LivreService', () => {
  let service: LivreService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(LivreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getLivres devrait appeler le bon endpoint avec pagination', () => {
    const fauxLivres: Livre[] = [
      { id: 1, titre: 'Le Petit Prince', isbn: '9782070408572', nombreExemplaires: 3, auteurNom: 'Saint-Exupéry' },
    ];
    const fausseReponse: Page<Livre> = {
      content: fauxLivres,
      totalPages: 1,
      totalElements: 1,
      size: 5,
      number: 0,
      first: true,
      last: true,
    };

    service.getLivres(0, 5).subscribe((reponse) => {
      expect(reponse.content.length).toBe(1);
      expect(reponse.content[0].titre).toBe('Le Petit Prince');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/livres?page=0&size=5`);
    expect(req.request.method).toBe('GET');
    req.flush(fausseReponse);
  });

  it('getLivre devrait appeler le bon endpoint avec l\'id', () => {
    const fauxLivre: Livre = {
      id: 8,
      titre: 'Notre-Dame de Paris',
      isbn: '9782070360001',
      nombreExemplaires: 2,
      auteurNom: 'Victor Hugo',
    };

    service.getLivre(8).subscribe((livre) => {
      expect(livre.titre).toBe('Notre-Dame de Paris');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/livres/8`);
    expect(req.request.method).toBe('GET');
    req.flush(fauxLivre);
  });

  it('deleteLivre devrait appeler DELETE sur le bon endpoint', () => {
    service.deleteLivre(8).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/livres/8`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});