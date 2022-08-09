import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAreaMapViewComponent } from './new-area-map-view.component';

describe('NewAreaMapViewComponent', () => {
  let component: NewAreaMapViewComponent;
  let fixture: ComponentFixture<NewAreaMapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAreaMapViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAreaMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
