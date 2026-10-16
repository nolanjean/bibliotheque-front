import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuteurListe } from './auteur-liste';

describe('AuteurListe', () => {
  let component: AuteurListe;
  let fixture: ComponentFixture<AuteurListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuteurListe],
    }).compileComponents();

    fixture = TestBed.createComponent(AuteurListe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
