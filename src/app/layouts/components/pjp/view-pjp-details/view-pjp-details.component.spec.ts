import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPjpDetailsComponent } from './view-pjp-details.component';

describe('ViewPjpDetailsComponent', () => {
  let component: ViewPjpDetailsComponent;
  let fixture: ComponentFixture<ViewPjpDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPjpDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPjpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
