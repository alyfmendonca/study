import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopupEditComponent} from "../popup-edit/popup-edit.component";
import domtoimage from 'dom-to-image';
import * as jspdf from 'jspdf';

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
    {text: 'Customizado', value: 0},
    {text: 'Layoute 1', value: 1},
    {text: 'Layoute 2', value: 2},
    {text: 'Layoute 3', value: 3},
    {text: 'Layoute 4', value: 4},
    {text: 'Layoute 5', value: 5},
    {text: 'Layoute 6', value: 6},
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

  flagCustom: boolean = true;

  divGrid = document.getElementById("divGridSalvar");
  
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

  testemudanca(evento){
    this.divGrid = document.getElementById("divGrid");
    console.log(this.divGrid);
    console.log(evento.value);
    if(evento.value == "a4"){
      this.divGrid.className = "";;
      this.divGrid.classList.add("tamanhoA4");
    }else if(evento.value == "a3"){
      this.divGrid.className = "";;
      this.divGrid.classList.add("tamanhoA3");
    }else if(evento.value == "a4hori"){
      this.divGrid.className = "";;
      this.divGrid.classList.add("tamanhoA4Hori");
    }
    else if(evento.value == "a3hori"){
      this.divGrid.className = "";;
      this.divGrid.classList.add("tamanhoA3Hori");
    }
  }

    mudancaLayoute(evento){
      switch (evento.value) {
        case 0:
          this.tiles = [];
          this.flagCustom = true;
          break;
        default:
            this.flagCustom = false;
          break;
      }

      if(evento.value == 1){
        this.tiles = [
          {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
        ]
        this.colsGrid = 1;
        this.linhasGrid = 1;
      }else if(evento.value == 2){
        this.tiles = [
          {text: 'One', cols: 2, rows: 1, color: 'lightblue'},
          {text: 'One', cols: 2, rows: 1, color: 'lightblue'},
        ]
        this.colsGrid = 2;
        this.linhasGrid = 2;
      }else if(evento.value == 3){
        this.tiles = [
          {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
          {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
          {text: 'One', cols: 2, rows: 1, color: 'lightblue'},
        ]
        this.colsGrid = 2;
        this.linhasGrid = 2;
      }else if(evento.value == 4){
        this.tiles = [
          {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
          {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
          {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
          {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
        ]
        this.colsGrid = 3;
        this.linhasGrid = 2;
      }else if(evento.value == 5){
        this.tiles = [
          {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
          {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
          {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
          {text: 'One', cols: 1, rows: 1, color: 'lightblue'}
        ]
        this.colsGrid = 2;
        this.linhasGrid = 2;
      }else if(evento.value == 6){
        this.tiles = [
          {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
          {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
          {text: 'One', cols: 2, rows: 1, color: 'lightblue'},
          {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
          {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
        ]
        this.colsGrid = 2;
        this.linhasGrid = 3;
      }
      
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
    if(this.flagCustom){
      if(valor == 'linha'){
            this.linhasGrid += 1;
            this.changeLinhas();
          }else if(valor == 'coluna'){
            this.colsGrid += 1;
            this.changeColunas();
          }
    }
  }
  menosUm(valor){
    if(this.flagCustom){
      if(valor == 'linha'){
        this.linhasGrid -= 1;
        this.changeLinhas();
      }else if(valor == 'coluna'){
        this.colsGrid -= 1;
        this.changeColunas();
      }
    }
  }
  

  selectSelectionImage(element){
    this.selectedSource = element.src.substring(element.src.indexOf("assets"));
  }

  selectGridImage(element){
      element.children[0].src = this.selectedSource;
      element.className = "center-cropped-wsrc";

      //relaciona classe com o tamanho
      if(element.width > element.height){
        element.firstElementChild.classList.remove("center-cropped-img");
        element.firstElementChild.classList.add("maiorWidth");
      }else{
        element.firstElementChild.classList.remove("center-cropped-img");
        element.firstElementChild.classList.add("maiorHeight");
      }

  }

  chamarImpressao(){
    var node = document.getElementById('divGridSalvar');

    var img;
    var filename;
    var newImage;


    domtoimage.toPng(node, { bgcolor: '#000' })

      .then(function(dataUrl) {

        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = function(){

        var pdfWidth = img.width;
        var pdfHeight = img.height;

          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

          var doc;

          if(pdfWidth > pdfHeight)
          {
            doc = new jspdf('l', 'px', [pdfWidth , pdfHeight]);
          }
          else
          {
            doc = new jspdf('p', 'px', [pdfWidth , pdfHeight]);
          }


          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();


          doc.addImage(newImage, 'PNG',  0, 0, width, height);
          filename = 'exame' + '.pdf';
          doc.save(filename);

        };


      })
      .catch(function(error) {

        // Error Handling

      });
  }

  chamaPrint(){
    const printContents = document.getElementById('divGridSalvar').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

}
