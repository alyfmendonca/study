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

  midiaOptionList: any[] = [
    {text: 'Lorem Ipsum', value: 1},
    {text: 'Lorem Ipsum Lorem', value: 2},
    {text: 'Lorem Lorem', value: 3},
  ]

  layoutOptionList: any[] = [
    {text: 'Lorem Ipsum', value: 1},
    {text: 'Lorem Ipsum Lorem', value: 2},
    {text: 'Lorem Lorem', value: 3},
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
  
  mockedModalidades: any[] = 
  [
    { MODALITY: 'RAIO X'},
    { MODALITY: 'TOMOGRAFIA'},
    { MODALITY: 'RESSONANCIA'},
    { MODALITY: 'ULTRASONOGRAFIA'},
    { MODALITY: 'PET / CT'},
  ];

  selectedSource:string = "";

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  chama(){
    document.getElementsByClassName('modalAjuste')[0].setAttribute("style", "display:flex;");
    document.getElementsByClassName('modalConteudo')[0].setAttribute("style", "display:flex;");
  }
  fecha(){
    document.getElementsByClassName('modalAjuste')[0].setAttribute("style", "display:none;");
    document.getElementsByClassName('modalConteudo')[0].setAttribute("style", "display:none;");

  }

  chamaPreview(){
    document.getElementsByClassName('modalPreview')[0].setAttribute("style", "display:flex;");
    document.getElementsByClassName('modalConteudoPreview')[0].setAttribute("style", "display:block;");
  }
  fechaPreview(){
    document.getElementsByClassName('modalPreview')[0].setAttribute("style", "display:none;");
    document.getElementsByClassName('modalConteudoPreview')[0].setAttribute("style", "display:none;");

  }

  onClickNext(id){
    let i = 0
    let continua = true;
    while(continua){
      let tab = document.getElementById(`mat-tab-label-${i}-1`);
      if(tab){
        tab.click();
        continua = false;
      }else{
        i++
      }
    }
    
  }
  onClickBack(){
    let i = 0
    let continua = true;
    while(continua){
      let tab = document.getElementById(`mat-tab-label-${i}-0`);
      if(tab){
        tab.click();
        continua = false;
      }else{
        i++
      }
    }
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

  maisUm(valor){
    if(valor == 'linha'){
      this.linhasGrid += 1;
      this.changeLinhas();
    }else if(valor == 'coluna'){
      this.colsGrid += 1;
      this.changeColunas();
    }
   
  }
  menosUm(valor){
    if(valor == 'linha'){
      this.linhasGrid -= 1;
      this.changeLinhas();
    }else if(valor == 'coluna'){
      this.colsGrid -= 1;
      this.changeColunas();
    }
    //this.changeColunas();
  }
  

  selectSelectionImage(element){
    this.selectedSource = element.src.substring(element.src.indexOf("assets"));
  }

  selectGridImage(element){
      element.children[0].src = this.selectedSource;
      element.className = "center-cropped-wsrc";
  }

}
