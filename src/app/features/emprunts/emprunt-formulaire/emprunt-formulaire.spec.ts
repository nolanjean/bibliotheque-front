import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpruntFormulaire } from './emprunt-formulaire';

describe('EmpruntFormulaire', () => {
  let component: EmpruntFormulaire;
  let fixture: ComponentFixture<EmpruntFormulaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpruntFormulaire],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpruntFormulaire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
