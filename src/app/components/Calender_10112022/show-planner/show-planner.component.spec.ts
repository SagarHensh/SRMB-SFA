import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlannerComponent } from './show-planner.component';

describe('ShowPlannerComponent', () => {
  let component: ShowPlannerComponent;
  let fixture: ComponentFixture<ShowPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPlannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
