import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MembreListe } from './membre-liste';

describe('MembreListe', () => {
  let component: MembreListe;
  let fixture: ComponentFixture<MembreListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembreListe],
    }).compileComponents();

    fixture = TestBed.createComponent(MembreListe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
