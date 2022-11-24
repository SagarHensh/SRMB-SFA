import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsrReportListComponent } from './csr-report-list.component';

describe('CsrReportListComponent', () => {
  let component: CsrReportListComponent;
  let fixture: ComponentFixture<CsrReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsrReportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsrReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
