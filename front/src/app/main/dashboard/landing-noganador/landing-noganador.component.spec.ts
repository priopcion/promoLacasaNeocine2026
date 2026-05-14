import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingNoganadorComponent } from './landing-noganador.component';

describe('LandingNoganadorComponent', () => {
  let component: LandingNoganadorComponent;
  let fixture: ComponentFixture<LandingNoganadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingNoganadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingNoganadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
