import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalComponent } from './signal.component';

describe('SignalComponent', () => {
  let component: SignalComponent;
  let fixture: ComponentFixture<SignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
