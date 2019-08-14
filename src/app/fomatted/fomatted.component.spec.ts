import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FomattedComponent } from './fomatted.component';

describe('FomattedComponent', () => {
  let component: FomattedComponent;
  let fixture: ComponentFixture<FomattedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FomattedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FomattedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
