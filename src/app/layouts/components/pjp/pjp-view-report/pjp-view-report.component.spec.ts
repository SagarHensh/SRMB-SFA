import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PjpViewReportComponent } from './pjp-view-report.component';

describe('PjpViewReportComponent', () => {
  let component: PjpViewReportComponent;
  let fixture: ComponentFixture<PjpViewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PjpViewReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PjpViewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
