import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdometerReportListComponent } from './odometer-report-list.component';

describe('OdometerReportListComponent', () => {
  let component: OdometerReportListComponent;
  let fixture: ComponentFixture<OdometerReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdometerReportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdometerReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
