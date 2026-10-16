import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuteurFormulaire } from './auteur-formulaire';

describe('AuteurFormulaire', () => {
  let component: AuteurFormulaire;
  let fixture: ComponentFixture<AuteurFormulaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
