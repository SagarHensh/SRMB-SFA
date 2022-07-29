import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PjpCalenderComponent } from './pjp-calender.component';

describe('PjpCalenderComponent', () => {
  let component: PjpCalenderComponent;
  let fixture: ComponentFixture<PjpCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PjpCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PjpCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
