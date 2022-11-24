import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShopRegistrationReportComponent } from './new-shop-registration-report.component';

describe('NewShopRegistrationReportComponent', () => {
  let component: NewShopRegistrationReportComponent;
  let fixture: ComponentFixture<NewShopRegistrationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewShopRegistrationReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewShopRegistrationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
