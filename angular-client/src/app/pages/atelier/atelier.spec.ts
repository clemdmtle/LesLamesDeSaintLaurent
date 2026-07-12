import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Atelier } from './atelier';

describe('Atelier', () => {
  let component: Atelier;
  let fixture: ComponentFixture<Atelier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Atelier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Atelier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
