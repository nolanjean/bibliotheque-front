import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { EmpruntListe } from './emprunt-liste';

describe('EmpruntListe', () => {
  let component: EmpruntListe;
  let fixture: ComponentFixture<EmpruntListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient()],
      imports: [EmpruntListe],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpruntListe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
