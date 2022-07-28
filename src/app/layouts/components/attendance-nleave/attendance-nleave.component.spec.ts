import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceNLeaveComponent } from './attendance-nleave.component';

describe('AttendanceNLeaveComponent', () => {
  let component: AttendanceNLeaveComponent;
  let fixture: ComponentFixture<AttendanceNLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceNLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceNLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
