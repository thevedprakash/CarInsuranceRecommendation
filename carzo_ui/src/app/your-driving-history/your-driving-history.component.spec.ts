import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourDrivingHistoryComponent } from './your-driving-history.component';

describe('YourDrivingHistoryComponent', () => {
  let component: YourDrivingHistoryComponent;
  let fixture: ComponentFixture<YourDrivingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourDrivingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourDrivingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
