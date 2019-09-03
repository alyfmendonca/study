import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Study} from '../model/study';
import {StudyService} from '../service/study.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  displayedColumns: string[] = ['id', 'acession', 'paciente', 'desc', 'modalidade', 'data', 'impresso', 'salvo', 'unidade'];
  dataSource: MatTableDataSource<Study>;

  study : Study[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //saber se o filtro está aberto ou fechado
  panelOpenState = false;

  constructor(private router: Router, private studyService: StudyService, private cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource(this.study)
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
      this.study = data.exams.filter(this.isFormatted);
      this.dataSource = new MatTableDataSource(this.study);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  isFormatted(element: Study, index, array){
    return +element.c_booblean_saved != 0;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}