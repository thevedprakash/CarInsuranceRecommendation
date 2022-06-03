import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationandemploymentComponent } from './educationandemployment.component';

describe('EducationandemploymentComponent', () => {
  let component: EducationandemploymentComponent;
  let fixture: ComponentFixture<EducationandemploymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationandemploymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationandemploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
