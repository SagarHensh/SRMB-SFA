import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerFeedbackReportComponent } from './dealer-feedback-report.component';

describe('DealerFeedbackReportComponent', () => {
  let component: DealerFeedbackReportComponent;
  let fixture: ComponentFixture<DealerFeedbackReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerFeedbackReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerFeedbackReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
