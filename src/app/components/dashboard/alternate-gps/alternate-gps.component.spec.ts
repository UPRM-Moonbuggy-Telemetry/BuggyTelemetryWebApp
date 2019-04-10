import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateGpsComponent } from './alternate-gps.component';

describe('AlternateGpsComponent', () => {
  let component: AlternateGpsComponent;
  let fixture: ComponentFixture<AlternateGpsComponent>;

  beforeEach(async(() => {
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
