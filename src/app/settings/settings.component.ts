import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {PrinterService} from '../service/printer.service';
import Swal from "sweetalert2";
import {Printer, PrinterList, PrinterObj} from '../model/printer';

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

  mockedAeTitles: any[] = [
    {aeTitle: 'trest', ip: '125.190.165.255', porta: 8088},
    {aeTitle: 'yuoiyt', ip: '39.123.123.123', porta: 5000},
    {aeTitle: 'quitruo', ip: '172.198.165.37', porta: 7000},
  ];

  printerAdd: string = "";
  printerIpAdd: string = "";
  printerTrayAdd: string = "";
  printerPaperAdd: string = "";

  // mockedDicomTags: any[] = 
  // [
  //   {
  //     TAG: 'PATIENTSNAME'
  //   },
  //   {
  //     TAG: 'PATIENTID',
  //   },
  //   {
  //     TAG: 'PATIENTSBIRTHDATE', 
  //   },
  //   {
  //     TAG: 'PATIENTSSEX', 
  //   },
  //   {
  //     TAG: 'OTHERPATIENTIDS',
  //   },
  //   {
  //     TAG: 'PATIENTAGE', 
  //   },
  //   {
  //     TAG: 'PATIENTSSIZE', 
  //   },
  //   {
  //     TAG: 'PATIENTSWEIGHT', 
  //   },
  //   {
  //     TAG: 'ACESSIONUMBER',  
  //   },
  //   {
  //     TAG: 'MODALITY',  
  //   },
  //   {
  //     TAG: 'MANUFACTURER',  
  //   },
  //   {
  //     TAG: 'INSTITUTIONNAME',   
  //   },
  //   {
  //     TAG: 'STATIONNAME' 
  //   }
  // ];

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

  constructor(private printerService: PrinterService) { }

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
  }

  ngOnInit() {
    this.printerService.getPrinters().subscribe(data => {
          this.handlePrinterData(data)
        },
        error => {
          Swal.fire('Erro ao buscar impessoras!', 'erro: ' + error, 'error')
        });
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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
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

}
