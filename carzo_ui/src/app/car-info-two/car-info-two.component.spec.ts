import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInfoTwoComponent } from './car-info-two.component';

describe('CarInfoTwoComponent', () => {
  let component: CarInfoTwoComponent;
  let fixture: ComponentFixture<CarInfoTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarInfoTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInfoTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
