import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivreListe } from './livre-liste';

describe('LivreListe', () => {
  let component: LivreListe;
  let fixture: ComponentFixture<LivreListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
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
