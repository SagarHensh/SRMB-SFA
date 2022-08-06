import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDealerInfluencerComponent } from './sub-dealer-influencer.component';

describe('SubDealerInfluencerComponent', () => {
  let component: SubDealerInfluencerComponent;
  let fixture: ComponentFixture<SubDealerInfluencerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubDealerInfluencerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubDealerInfluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
