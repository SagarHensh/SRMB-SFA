import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTrackingMapViewComponent } from './live-tracking-map-view.component';

describe('LiveTrackingMapViewComponent', () => {
  let component: LiveTrackingMapViewComponent;
  let fixture: ComponentFixture<LiveTrackingMapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveTrackingMapViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveTrackingMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
