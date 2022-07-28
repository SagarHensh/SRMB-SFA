import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeLayoutComponent } from './scheme-layout.component';

describe('SchemeLayoutComponent', () => {
  let component: SchemeLayoutComponent;
  let fixture: ComponentFixture<SchemeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
