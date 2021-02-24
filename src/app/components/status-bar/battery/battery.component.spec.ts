import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BatteryComponent } from './battery.component';

describe('BatteryComponent', () => {
  let component: BatteryComponent;
  let fixture: ComponentFixture<BatteryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BatteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
