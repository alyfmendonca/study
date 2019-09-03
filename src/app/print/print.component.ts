import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Study} from '../model/study';
import {StudyService} from '../service/study.service';
import {Router} from '@angular/router';
import {PrinterService} from '../service/printer.service';
import Swal from "sweetalert2";
import {Printer, PrinterList, PrinterObj} from '../model/printer';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  displayedColumns: string[] = ['id', 'acession', 'paciente', 'desc', 'modalidade', 'data', 'impresso', 'salvo', 'unidade', 'print'];
  dataSource: MatTableDataSource<Study>;

  study : Study[] = [];

  printerColumns: string[] = ['NOME', 'IP', 'TRAY', 'PAPER']
  printerSource = new MatTableDataSource<Printer>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //saber se o filtro está aberto ou fechado
  panelOpenState = false;

  constructor(private router: Router, private studyService: StudyService, private cdr: ChangeDetectorRef, public printerService:PrinterService) {
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

    this.printerService.getPrinters().subscribe(data => {
      this.handlePrinterData(data)
    },
    error => {
      Swal.fire('Erro ao buscar impessoras!', 'erro: ' + error, 'error')
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

  handlePrinterData(data: PrinterList){
    this.printerSource.data = data.printers
  }

  openPrintPopup(element) {

    this.chamaPrinter()

  }

  printAction(elemento){
    
    this.fechaPrinter()

  }

  chamaPrinter(){
    document.getElementsByClassName('modalPrinter')[0].setAttribute("style", "display:flex;");
    document.getElementsByClassName('modalConteudoPrinter')[0].setAttribute("style", "display:block;");
  }

  fechaPrinter(){
    document.getElementsByClassName('modalPrinter')[0].setAttribute("style", "display:none;");
    document.getElementsByClassName('modalConteudoPrinter')[0].setAttribute("style", "display:none;");

  }

}