import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryVisitReportComponent } from './enquiry-visit-report.component';

describe('EnquiryVisitReportComponent', () => {
  let component: EnquiryVisitReportComponent;
  let fixture: ComponentFixture<EnquiryVisitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryVisitReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryVisitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
