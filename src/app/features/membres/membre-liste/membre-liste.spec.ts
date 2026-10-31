import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MembreListe } from './membre-liste';

describe('MembreListe', () => {
  let component: MembreListe;
  let fixture: ComponentFixture<MembreListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembreListe],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MembreListe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});