import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { LivreListe } from './livre-liste';

describe('LivreListe', () => {
  let component: LivreListe;
  let fixture: ComponentFixture<LivreListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivreListe],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LivreListe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});