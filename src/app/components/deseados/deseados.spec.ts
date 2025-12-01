import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deseados } from './deseados';

import { provideHttpClientTesting } from '@angular/common/http/testing';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    providers: [
      provideHttpClientTesting(),
    ],
  }).compileComponents();
});

describe('Deseados', () => {
  let component: Deseados;
  let fixture: ComponentFixture<Deseados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deseados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deseados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
