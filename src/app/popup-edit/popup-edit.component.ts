import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-popup-edit',
  templateUrl: './popup-edit.component.html',
  styleUrls: ['./popup-edit.component.css']
})
export class PopupEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupEditComponent>) { }

  ngOnInit() {
  }

}
