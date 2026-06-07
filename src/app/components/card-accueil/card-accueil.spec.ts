import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAccueil } from './card-accueil';

describe('CardAccueil', () => {
  let component: CardAccueil;
  let fixture: ComponentFixture<CardAccueil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAccueil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAccueil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
