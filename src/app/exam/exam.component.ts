import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopupEditComponent} from "../popup-edit/popup-edit.component";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
  ];

  scopes: any[] = [
    {text: 'Nas selecionadas', value: 1},
    {text: 'Na página atual', value: 2},
    {text: 'Em toda a série', value: 3}
  ]

  editors: any[] = [
    {text: 'Régua de medidas', value: 1},
    {text: 'Key page(s)', value: 2},
    {text: 'Colimação', value: 3},
    {text: 'Mantém matriz', value: 4},
    {text: 'Overlay', value: 5}
  ]

  color = "primary";

  checked = false;
  disabled = false;

  checkedUnder = false;
  disabledUnder = false;

  colsGrid:number = 4;
  linhasGrid:number = 5;

  selectedScope:number = 1;
  selectedEditor:number = 1;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupEditComponent, {
      width: '90%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  changeLinhas(){
    var numeroDeImagens = this.colsGrid * this.linhasGrid;

    if(this.tiles.length > numeroDeImagens){
      this.tiles.splice(numeroDeImagens); 
    }else if(this.tiles.length < numeroDeImagens){
      for (let index = this.tiles.length; index < numeroDeImagens; index++){
        var newTile:Tile = {
          text: 'One', cols: 1, rows: 1, color: 'red'
        }
        this.tiles.push(newTile);
      }
    }else{
      //nada
    }
  }

  changeColunas(){
    var numeroDeImagens = this.colsGrid * this.linhasGrid;

    if(this.tiles.length > numeroDeImagens){
      this.tiles.splice(numeroDeImagens); 
    }else if(this.tiles.length < numeroDeImagens){
      for (let index = this.tiles.length; index < numeroDeImagens; index++){
        var newTile:Tile = {
          text: 'One', cols: 1, rows: 1, color: 'red'
        }
        this.tiles.push(newTile);
      }
    }else{
      //nada
    }
  }

}
