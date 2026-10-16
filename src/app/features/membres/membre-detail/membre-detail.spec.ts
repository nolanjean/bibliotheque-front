import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MembreDetail } from './membre-detail';

describe('MembreDetail', () => {
  let component: MembreDetail;
  let fixture: ComponentFixture<MembreDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [MembreDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(MembreDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
