import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInfoThreeComponent } from './car-info-three.component';

describe('CarInfoThreeComponent', () => {
  let component: CarInfoThreeComponent;
  let fixture: ComponentFixture<CarInfoThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarInfoThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInfoThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
