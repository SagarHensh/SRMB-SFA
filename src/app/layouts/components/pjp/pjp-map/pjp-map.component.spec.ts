import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PjpMapComponent } from './pjp-map.component';

describe('PjpMapComponent', () => {
  let component: PjpMapComponent;
  let fixture: ComponentFixture<PjpMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PjpMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PjpMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
