import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LandingPrincipalComponent } from "./landing-principal.component";

describe("LandingPrincipalComponent", () => {
  let component: LandingPrincipalComponent;
  let fixture: ComponentFixture<LandingPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingPrincipalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
