import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedUnplannedReportsComponent } from './planned-unplanned-reports.component';

describe('PlannedUnplannedReportsComponent', () => {
  let component: PlannedUnplannedReportsComponent;
  let fixture: ComponentFixture<PlannedUnplannedReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannedUnplannedReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannedUnplannedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
