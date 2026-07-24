import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCouteau } from './modal-couteau';

describe('ModalCouteau', () => {
  let component: ModalCouteau;
  let fixture: ComponentFixture<ModalCouteau>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCouteau]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCouteau);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
