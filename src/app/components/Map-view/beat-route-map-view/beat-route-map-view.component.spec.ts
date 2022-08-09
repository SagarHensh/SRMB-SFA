import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatRouteMapViewComponent } from './beat-route-map-view.component';

describe('BeatRouteMapViewComponent', () => {
  let component: BeatRouteMapViewComponent;
  let fixture: ComponentFixture<BeatRouteMapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatRouteMapViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeatRouteMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
