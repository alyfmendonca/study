import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataText } from '../settings.component';

@Component({
  selector: 'app-dialog-text-pop',
  templateUrl: './dialog-text-pop.component.html',
  styleUrls: ['./dialog-text-pop.component.css']
})
export class PopUpDialogText implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopUpDialogText>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataText) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}