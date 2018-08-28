import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuggysComponent } from './buggys.component';

describe('BuggysComponent', () => {
  let component: BuggysComponent;
  let fixture: ComponentFixture<BuggysComponent>;

  beforeEach(async(() => {
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
