import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlternateGpsComponent } from './alternate-gps.component';

describe('AlternateGpsComponent', () => {
  let component: AlternateGpsComponent;
  let fixture: ComponentFixture<AlternateGpsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternateGpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternateGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
