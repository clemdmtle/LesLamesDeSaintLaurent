import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCouteau } from './card-couteau';

describe('CardCouteau', () => {
  let component: CardCouteau;
  let fixture: ComponentFixture<CardCouteau>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCouteau]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCouteau);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
