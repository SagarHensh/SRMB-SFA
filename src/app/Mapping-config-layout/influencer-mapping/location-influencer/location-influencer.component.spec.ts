import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInfluencerComponent } from './location-influencer.component';

describe('LocationInfluencerComponent', () => {
  let component: LocationInfluencerComponent;
  let fixture: ComponentFixture<LocationInfluencerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationInfluencerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationInfluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
