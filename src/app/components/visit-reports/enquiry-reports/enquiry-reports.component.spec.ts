import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryReportsComponent } from './enquiry-reports.component';

describe('EnquiryReportsComponent', () => {
  let component: EnquiryReportsComponent;
  let fixture: ComponentFixture<EnquiryReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
