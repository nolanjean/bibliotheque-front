import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MembreFormulaire } from './membre-formulaire';

describe('MembreFormulaire', () => {
  let component: MembreFormulaire;
  let fixture: ComponentFixture<MembreFormulaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [MembreFormulaire],
    }).compileComponents();

    fixture = TestBed.createComponent(MembreFormulaire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
