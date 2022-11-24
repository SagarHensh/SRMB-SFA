import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyReportListComponent } from './survey-report-list.component';

describe('SurveyReportListComponent', () => {
  let component: SurveyReportListComponent;
  let fixture: ComponentFixture<SurveyReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyReportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
