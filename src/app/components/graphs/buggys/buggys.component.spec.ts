import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuggysComponent } from './buggys.component';

describe('BuggysComponent', () => {
  let component: BuggysComponent;
  let fixture: ComponentFixture<BuggysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuggysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuggysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
