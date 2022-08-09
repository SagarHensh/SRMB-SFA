import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMapViewComponent } from './sales-map-view.component';

describe('SalesMapViewComponent', () => {
  let component: SalesMapViewComponent;
  let fixture: ComponentFixture<SalesMapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesMapViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
