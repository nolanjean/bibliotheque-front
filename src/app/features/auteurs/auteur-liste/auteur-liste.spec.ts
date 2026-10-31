import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AuteurListe } from './auteur-liste';

describe('AuteurListe', () => {
  let component: AuteurListe;
  let fixture: ComponentFixture<AuteurListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuteurListe],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AuteurListe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});