import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import {StudyService} from "../service/study.service";
import { Study } from '../model/study';

@Component({
  selector: 'app-nonformatted',
  templateUrl: './nonformatted.component.html',
  styleUrls: ['./nonformatted.component.css']
})
export class NonformattedComponent implements OnInit {
  displayedColumns: string[] = ['id', 'acession', 'paciente', 'desc', 'modalidade', 'data', 'impresso', 'salvo'];
  dataSource: MatTableDataSource<Study>;

  study: Study [] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //saber se o filtro está aberto ou fechado
  panelOpenState = false;

  selection = new SelectionModel<Study>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Study, index?: Number): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${index}`;
  }

  redirPrint(elemento){
    this.router.navigate(["home/exam", elemento.accession_number]);
  }

  constructor(private router: Router, private studyService: StudyService, private cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource(this.study);
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
    this.studyService.getStudies().subscribe( data => {
      this.study = data.exams.filter(this.isNonFormatted);
      this.dataSource = new MatTableDataSource(this.study);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  isNonFormatted(element: Study, index, array){
    return +element.c_booblean_saved == 0;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
