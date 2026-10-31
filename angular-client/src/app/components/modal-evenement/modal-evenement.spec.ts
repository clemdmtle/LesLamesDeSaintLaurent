import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEvenement } from './modal-evenement';

describe('ModalEvenement', () => {
  let component: ModalEvenement;
  let fixture: ComponentFixture<ModalEvenement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEvenement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEvenement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
