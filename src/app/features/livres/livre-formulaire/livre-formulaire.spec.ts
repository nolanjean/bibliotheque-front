import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivreFormulaire } from './livre-formulaire';

describe('LivreFormulaire', () => {
  let component: LivreFormulaire;
  let fixture: ComponentFixture<LivreFormulaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivreFormulaire],
    }).compileComponents();

    fixture = TestBed.createComponent(LivreFormulaire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
