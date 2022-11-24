import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitConversionReportComponent } from './visit-conversion-report.component';

describe('VisitConversionReportComponent', () => {
  let component: VisitConversionReportComponent;
  let fixture: ComponentFixture<VisitConversionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitConversionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitConversionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
