import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuteurDetail } from './auteur-detail';

describe('AuteurDetail', () => {
  let component: AuteurDetail;
  let fixture: ComponentFixture<AuteurDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [AuteurDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(AuteurDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
