import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImagePopupComponent } from './dialog-image-popup.component';

describe('DialogImagePopupComponent', () => {
  let component: DialogImagePopupComponent;
  let fixture: ComponentFixture<DialogImagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogImagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
