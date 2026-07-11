import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSalon } from './card-salon';

describe('CardSalon', () => {
  let component: CardSalon;
  let fixture: ComponentFixture<CardSalon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSalon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSalon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
