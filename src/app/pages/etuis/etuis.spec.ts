import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Etuis } from './etuis';

describe('Etuis', () => {
  let component: Etuis;
  let fixture: ComponentFixture<Etuis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Etuis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Etuis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
