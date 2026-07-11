import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modeles } from './modeles';

describe('Modeles', () => {
  let component: Modeles;
  let fixture: ComponentFixture<Modeles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modeles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modeles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
