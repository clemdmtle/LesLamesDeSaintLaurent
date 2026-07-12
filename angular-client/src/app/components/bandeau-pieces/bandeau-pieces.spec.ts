import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandeauPieces } from './bandeau-pieces';

describe('BandeauPieces', () => {
  let component: BandeauPieces;
  let fixture: ComponentFixture<BandeauPieces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandeauPieces]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandeauPieces);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
