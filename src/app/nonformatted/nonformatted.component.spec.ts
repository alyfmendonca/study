import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonformattedComponent } from './nonformatted.component';

describe('NonformattedComponent', () => {
  let component: NonformattedComponent;
  let fixture: ComponentFixture<NonformattedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonformattedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonformattedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
