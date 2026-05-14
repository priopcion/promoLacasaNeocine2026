import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingFormularioComponent } from './landing-formulario.component';

describe('LandingFormularioComponent', () => {
  let component: LandingFormularioComponent;
  let fixture: ComponentFixture<LandingFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingFormularioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
