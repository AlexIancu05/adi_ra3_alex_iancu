import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Carrito } from './carrito';

import { provideHttpClientTesting } from '@angular/common/http/testing';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    providers: [
      provideHttpClientTesting(),
    ],
  }).compileComponents();
});

describe('Carrito', () => {
  let component: Carrito;
  let fixture: ComponentFixture<Carrito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carrito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carrito);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
