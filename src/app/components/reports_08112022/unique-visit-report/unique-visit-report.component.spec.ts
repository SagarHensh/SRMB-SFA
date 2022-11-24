import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueVisitReportComponent } from './unique-visit-report.component';

describe('UniqueVisitReportComponent', () => {
  let component: UniqueVisitReportComponent;
  let fixture: ComponentFixture<UniqueVisitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniqueVisitReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniqueVisitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
