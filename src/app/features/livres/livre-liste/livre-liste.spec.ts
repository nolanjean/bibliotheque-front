import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivreListe } from './livre-liste';

describe('LivreListe', () => {
  let component: LivreListe;
  let fixture: ComponentFixture<LivreListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivreListe],
    }).compileComponents();

    fixture = TestBed.createComponent(LivreListe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
