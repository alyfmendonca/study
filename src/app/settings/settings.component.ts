import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

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
    {aeTitle: 'suiton', ip: '167.234.65.23', porta: 8019}
  ];

  mockedDicomTags: any = 
      {  
       PATIENTSNAME: 'PATIENTSNAME', PATIENTID: 'PATIENTID', PATIENTSBIRTHDATE: 'PATIENTSBIRTHDATE', PATIENTSSEX: 'PATIENTSSEX', OTHERPATIENTIDS: 'OTHERPATIENTIDS',
       PATIENTAGE: 'PATIENTAGE', PATIENTSSIZE: 'PATIENTSSIZE', PATIENTSWEIGHT: 'PATIENTSWEIGHT', ACESSIONUMBER: 'ACESSIONUMBER', MODALITY: 'MODALITY',
       MANUFACTURER: 'MANUFACTURER', INSTITUTIONNAME: 'INSTITUTIONNAME', STATIONNAME: 'STATIONNAME'  
      };
      
  mockedModalidades: any[] = 
  [
    { MODALITY: 'RAIO X'},
    { MODALITY: 'TOMOGRAFIA'},
    { MODALITY: 'RESSONANCIA'},
    { MODALITY: 'ULTRASONOGRAFIA'},
    { MODALITY: 'PET / CT'},
    { MODALITY: 'MEDICINA NUCLEAR'}
  ];

  constructor() { }

  displayedColumns: string[] = ['SELECT', 'AETITLE', 'IP', 'PORTA'];
  dataSource = new MatTableDataSource<any>(this.mockedAeTitles);
  selection = new SelectionModel<any>(true, []);

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

  ngOnInit() {
  }

  btnSalvar(){

  }

  aetitleApagar(){

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
