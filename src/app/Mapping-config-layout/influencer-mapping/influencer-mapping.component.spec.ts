import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerMappingComponent } from './influencer-mapping.component';

describe('InfluencerMappingComponent', () => {
  let component: InfluencerMappingComponent;
  let fixture: ComponentFixture<InfluencerMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfluencerMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
