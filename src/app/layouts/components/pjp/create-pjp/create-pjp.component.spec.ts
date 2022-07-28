import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePjpComponent } from './create-pjp.component';

describe('CreatePjpComponent', () => {
  let component: CreatePjpComponent;
  let fixture: ComponentFixture<CreatePjpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePjpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePjpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
