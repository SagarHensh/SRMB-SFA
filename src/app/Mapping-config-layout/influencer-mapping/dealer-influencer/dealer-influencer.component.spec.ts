import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerInfluencerComponent } from './dealer-influencer.component';

describe('DealerInfluencerComponent', () => {
  let component: DealerInfluencerComponent;
  let fixture: ComponentFixture<DealerInfluencerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerInfluencerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerInfluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
