import { Component, OnInit, ViewChild } from '@angular/core';
import {StudyService} from "../service/study.service";
import {Study} from "../model/study";
import {Router} from "@angular/router";
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-exam-list-screen',
  templateUrl: './exam-list-screen.component.html',
  styleUrls: ['./exam-list-screen.component.css']
})

export class ExamListScreenComponent implements OnInit {
  displayedColumns = ['acessionNumber', 'description', 'formatted', 'printed', 'saved', 'modality', 'createdAt', 'attendance'];
  dataSource: Study[] = [];
  token;
  url = 'nonformatted';

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router, private studyService : StudyService) { }

  ngOnInit() {
    //this.dataSource.sort = this.sort;

    this.url = this.router.url;
    if(this.url == '/home/print'){
      this.displayedColumns = ['acessionNumber', 'description', 'formatted', 'printed', 'saved', 'modality', 'createdAt', 'attendance', 'print'];
    }
    // Loading Studies:
    this.studyService.getStudies()
      .subscribe( data => {
        console.log(data);
        this.dataSource = data.exams;
      })
  }

  redirPrint(elemento){
    this.router.navigateByUrl("home/exam/1");
  }

}
