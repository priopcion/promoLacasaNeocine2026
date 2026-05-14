import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingGanadorComponent } from './landing-ganador.component';

describe('LandingGanadorComponent', () => {
  let component: LandingGanadorComponent;
  let fixture: ComponentFixture<LandingGanadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingGanadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingGanadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
