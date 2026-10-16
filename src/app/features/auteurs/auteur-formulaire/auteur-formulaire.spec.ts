import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuteurFormulaire } from './auteur-formulaire';

describe('AuteurFormulaire', () => {
  let component: AuteurFormulaire;
  let fixture: ComponentFixture<AuteurFormulaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [AuteurFormulaire],
    }).compileComponents();

    fixture = TestBed.createComponent(AuteurFormulaire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
