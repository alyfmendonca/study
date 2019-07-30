import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamListScreenComponent } from './exam-list-screen.component';

describe('ExamListScreenComponent', () => {
  let component: ExamListScreenComponent;
  let fixture: ComponentFixture<ExamListScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamListScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
