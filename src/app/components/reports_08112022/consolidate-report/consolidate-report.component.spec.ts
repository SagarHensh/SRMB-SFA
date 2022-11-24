import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidateReportComponent } from './consolidate-report.component';

describe('ConsolidateReportComponent', () => {
  let component: ConsolidateReportComponent;
  let fixture: ComponentFixture<ConsolidateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidateReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
