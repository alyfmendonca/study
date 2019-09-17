import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataImg } from '../settings.component';

@Component({
  selector: 'app-dialog-image-popup',
  templateUrl: './dialog-image-popup.component.html',
  styleUrls: ['./dialog-image-popup.component.css']
})
export class DialogImagePopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogImagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataImg) { }

  ngOnInit() {
  }

  inputImg = '';

  dataSaida = {
    src: this.inputImg,
    clickedId: this.data.clickedId
  };

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }

}
