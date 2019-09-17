import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {PrinterService} from '../service/printer.service';
import Swal from "sweetalert2";
import {Printer, PrinterList, PrinterObj} from '../model/printer';
import { SettingsService } from '../service/settings.service';
import {map} from 'rxjs/operators';

import { getModalidades, singleDicomTag } from '../model/getModalidades';
import { PopUpDialogText } from './dialog-text-pop/dialog-text-pop.component';

export interface DialogDataText {
  linhaOne: string;
  linhaTwo: string;
  linhaThree: string;
  clickedId: string;
}

export interface DialogDataImg {
  src: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  localServer:string = "";
  poolPrinter:string = "";

  rdUp:string = "1";

  aeTitleAdd:string = "";
  ipAdd:string = "";
  portaAdd:string = "";

  mockedAeTitles: any[] = [];

  printerAdd: string = "";
  printerIpAdd: string = "";
  printerTrayAdd: string = "";
  printerPaperAdd: string = "";

  mockedModalidades: any[] = 
  [
    { MODALITY: 'RAIO X'},
    { MODALITY: 'TOMOGRAFIA'},
    { MODALITY: 'RESSONANCIA'},
    { MODALITY: 'ULTRASONOGRAFIA'},
    { MODALITY: 'PET / CT'},
    { MODALITY: 'MEDICINA NUCLEAR'}
  ];
  listDicomDropped2 = [];
  listDicomDropped3 = [];
  listDicomDropped4 = [];
  mockedDicomTags = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  listDicomDropped = [
    'Get up',
    'Brush teeth',
    
  ];
  fullDicomTags: singleDicomTag[] = [];
  dicomTags: singleDicomTag[] = [];
  dicomTagsTopLeft: singleDicomTag[] = [];
  dicomTagsTopRight: singleDicomTag[] = [];
  dicomTagsBottomLeft: singleDicomTag[] = [];
  dicomTagsBottomRight: singleDicomTag[] = [];

  arrayModalidade: getModalidades;

  listCabecalho: any[] = [];
  listRodape: any[] = [];

  constructor(private printerService: PrinterService, private settingsService: SettingsService, private dialog: MatDialog) { }

  displayedColumns: string[] = ['SELECT', 'AETITLE', 'IP', 'PORTA'];
  dataSource = new MatTableDataSource<any>(this.mockedAeTitles);
  selection = new SelectionModel<any>(true, []);

  printerColumns: string[] = ['SELECT', 'NOME', 'IP', 'TRAY', 'PAPER']
  printerSource = new MatTableDataSource<Printer>();


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  mudaClasse(elem){
    console.log(elem);

    this.dicomTags = [];
    this.dicomTagsBottomLeft = [];
    this.dicomTagsBottomRight = [];
    this.dicomTagsTopLeft =[];
    this.dicomTagsTopRight = [];

    this.fullDicomTags.map(item => {
      if(item.fk_modality == elem){
        switch(item.positioning){
          case "TOP LEFT":
            this.dicomTagsTopLeft.push(item);
            break;
          case "TOP RIGHT":
            this.dicomTagsTopRight.push(item);
            break;
          case "BOTTOM RIGHT":
            this.dicomTagsBottomRight.push(item);
            break;
          case "BOTTOM LEFT":
            this.dicomTagsBottomLeft.push(item);
            break;
          default:
            this.dicomTags.push(item);
            break;
        }
      }
    })


  }

  auxiliarPosition: any [] = [];
  ngOnInit() {
    this.printerService.getPrinters().subscribe(data => {
          this.handlePrinterData(data)
        },
        error => {
          Swal.fire('Erro ao buscar impessoras!', 'erro: ' + error, 'error')
        });

        this.settingsService.getPositions().subscribe(retorno => {
          
          this.auxiliarPosition = retorno;
          console.log(this.auxiliarPosition);
        })
        this.settingsService.getModalidades().subscribe(response => {
          console.log('aquiii')
          console.log(response);
          this.arrayModalidade = response;
          response.modalities.map(mod =>{
            response.dicomTags.map(item =>{
              
              let aux = {
                n_dicom_tags_id: item.n_dicom_tags_id,
                tag: item.tag,
                display_text: item.display_text,
                fk_modality: mod.modality_id,
                positioning: '',
                tag_positioning_id: '',
                dicom_tag_id_fk:'',
                institution_fk: response.institutionSite[0].institution_site_id,
                last_update: ''
              }
              this.auxiliarPosition.map(position => {
                if(position.dicom_tag_id_fk == item.n_dicom_tags_id && position.fk_modality == mod.modality_id){
                  aux.positioning = position.positioning;
                  aux.tag_positioning_id = position.tag_positioning_id;
                  aux.dicom_tag_id_fk = position.dicom_tag_id_fk;
                  aux.last_update = position.last_update;
                }
              })
              this.fullDicomTags.push(aux);
              if(mod.modality_id == '1'){
                switch(aux.positioning){
                  case "TOP LEFT":
                    this.dicomTagsTopLeft.push(aux);
                    break;
                  case "TOP RIGHT":
                    this.dicomTagsTopRight.push(aux);
                    break;
                  case "BOTTOM RIGHT":
                    this.dicomTagsBottomRight.push(aux);
                    break;
                  case "BOTTOM LEFT":
                    this.dicomTagsBottomLeft.push(aux);
                    break;
                  default:
                    this.dicomTags.push(aux);
                    break;
                }
                
              }
              console.log(this.fullDicomTags);
              console.log(this.dicomTags);
    
            })
          })
          
        })
  }

  handlePrinterData(data: PrinterList){
    this.printerSource.data = data.printers
  }

  printerAddFunction(){
    this.printerService.postPrinter(this.printerAdd, this.printerIpAdd, this.printerTrayAdd, 4, this.printerPaperAdd)
        .subscribe(data => {
              this.handlePrinterAddData(data)
            },
            error => {
              Swal.fire('Erro ao adicionar impessora!', 'erro: ' + error, 'error');
              console.log(error);
            });
  }

  handlePrinterAddData(data: PrinterObj){
    this.printerSource.data.push(data.printer)
  }

  btnSalvar(){

  }

  aetitleApagar(){

  }

  drop(event: CdkDragDrop<singleDicomTag[]>, posicao) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      if(posicao == 'inicial'){
          //deleta o item no caso de mover para a lista de dicomtags
          this.settingsService.deletePositionin(event.container.data[event.currentIndex].tag_positioning_id).subscribe(response => {
            console.log(response);
          })
      }else if(event.container.data[event.currentIndex].positioning == ''){
        //cria uma nova posicao para o caso do item nao estar assocido a nenhum box anteriormente
        
        // console.log(event.container.data[event.currentIndex]);
        
        this.settingsService.createPositionin(event.container.data[event.currentIndex], posicao).subscribe(response => {
          console.log(response);
        })
      }else{
        //atualiza o card do caso de ele estar indo de um box para outro
        // console.log('put')
        this.settingsService.updatePositionin(event.container.data[event.currentIndex], posicao).subscribe(response => {
          console.log(response);
        })
      }
    }
    
    
    
  }

  aetitleAdd(){
    if(this.aeTitleAdd == '' || this.ipAdd == '' || this.portaAdd == ''){
      alert('Digite as informações à esquerda da tabela.');
      return;
    }else{
      var newaeTitle: any = {
        aeTitle: this.aeTitleAdd,
        ip: this.ipAdd,
        porta: this.portaAdd
      }
      this.mockedAeTitles.push(newaeTitle);
      this.dataSource = new MatTableDataSource<any>(this.mockedAeTitles);
      this.aeTitleAdd = '';
      this.ipAdd = '';
      this.portaAdd = '';
    }
  }

  aetitleEdit(){

  }

  teste(){
    console.log(this.selection);
  }

  putList(result){

   
  }

  retorno: any = {};

  openDialog(id: string): void {
    let modalText = {
      linhaOne : 'Teste',
      linhaTwo: '',
      linhaThree: ''
    }

    
    const dialogRef = this.dialog.open(PopUpDialogText, {
      data: {
        linhaOne: modalText.linhaOne, 
        linhaTwo: modalText.linhaTwo, 
        linhaThree: modalText.linhaThree, 
        clickedId: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.retorno = result;
      console.log(this.retorno)
        if(this.retorno != undefined && this.retorno.clickedId && this.retorno.clickedId != ''){
          
          console.log(this.retorno.clickedId);

          setTimeout(() => {
            console.log(this.retorno.clickedId);
          }, 3000);

          if(this.retorno.clickedId == '1' || this.retorno.clickedId == '2' || this.retorno.clickedId == '3'){
            console.log('Cabeçalho');

            console.log(this.listCabecalho.findIndex(item => this.retorno.clickedId == item.clickedId));
            
            if(this.listCabecalho.findIndex(item => this.retorno.clickedId == item.clickedId) != -1){
              this.listCabecalho.splice(this.listCabecalho.findIndex(item => this.retorno.clickedId == item.clickedId), 1, result)
            }else{
              this.listCabecalho.push(result);
            }
      
          }else{
            console.log('Rodapé');
            
            
            if(this.listRodape.findIndex(item => this.retorno.clickedId == item.clickedId) != -1){
              this.listRodape.splice(this.listRodape.findIndex(item => this.retorno.clickedId == item.clickedId), 1, result)
            }else{
              this.listRodape.push(result);
            }
      
          }
      
          console.log(this.listCabecalho);
          console.log(this.listRodape);

      }

      
   });

  }

}