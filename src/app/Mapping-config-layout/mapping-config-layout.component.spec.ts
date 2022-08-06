import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingConfigLayoutComponent } from './mapping-config-layout.component';

describe('SchemeLayoutComponent', () => {
  let component: MappingConfigLayoutComponent;
  let fixture: ComponentFixture<MappingConfigLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappingConfigLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MappingConfigLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
