import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

export interface PeriodicElement {
  id: number
  acession: string;
  paciente: string;
  desc: string;
  modalidade: string;
  data: string;
  impresso: string;
  salvo: string;
  unidade: string;
  flag: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, acession: 'LA34AH_x8', paciente: "Alyf", desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: true},
  {id: 2, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: false},
  {id: 3, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: true},
  {id: 4, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: true},
  {id: 5, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: false},
  {id: 6, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: true},
  {id: 7, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: false},
  {id: 8, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: true},
  {id: 9, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: false},
  {id: 10, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: false},
  {id: 11, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: true},
  {id: 12, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: true},
  {id: 13, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: true},
  {id: 14, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: false},
  {id: 15, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: true},
  {id: 16, acession: 'LA34AH_x8', paciente: "Lorem Ipsum",desc: "US tórax", modalidade: "US", data: "01/03/2019", impresso: "não", salvo: "sim", unidade: "Copa D'or", flag: false},


];




/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  displayedColumns: string[] = ['id', 'acession', 'paciente', 'desc', 'modalidade', 'data', 'impresso', 'salvo', 'unidade'];
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //saber se o filtro está aberto ou fechado
  panelOpenState = false;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(users);
    this.dataSource = new MatTableDataSource(ELEMENT_DATA)
  }


  //variaveis do filtro 
  acssionFiltro: string;
  pacienteFiltro: string;
  descFiltro: string;
  modalidadeFiltro: string;
  dataFiltro: string;
  impressoFiltro: boolean;
  salvoFiltro: boolean;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };

}