import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivreDetail } from './livre-detail';

describe('LivreDetail', () => {
  let component: LivreDetail;
  let fixture: ComponentFixture<LivreDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [LivreDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(LivreDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
