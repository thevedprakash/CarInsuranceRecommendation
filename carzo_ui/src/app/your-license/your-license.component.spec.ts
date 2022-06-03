import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourLicenseComponent } from './your-license.component';

describe('YourLicenseComponent', () => {
  let component: YourLicenseComponent;
  let fixture: ComponentFixture<YourLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
