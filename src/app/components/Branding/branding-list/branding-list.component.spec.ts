import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandingListComponent } from './branding-list.component';

describe('BrandingListComponent', () => {
  let component: BrandingListComponent;
  let fixture: ComponentFixture<BrandingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
