import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../AppConstants";
import { Study } from '../model/study';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http : HttpClient) { }

  savesStudy(image, patientId) : Observable<any>{
    let body: {
      file: string,
      institution_site_id: string,
      patient_id: string,
      filename: string,
    };

     body = {
      file: image,
      institution_site_id: "4",
      patient_id: patientId,
      filename: (new Date().getTime().toString()) + ".pdf"
    };

    let token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    };

    return this.http.post<any>(AppConstants.baseURL + `formattedImage/uploadImage`, body, options);
  }

  savesExam(userId, studyId) : Observable<any>{
      let body: {
          fk_user_id: string,
          fk_study_id: string,
      };

      body = {
          fk_user_id: "10",
          fk_study_id: studyId,
      };

      let token = localStorage.getItem('token');
      const options = {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
              .set('Content-Type', 'application/json'),
      };

      return this.http.post<any>(AppConstants.baseURL + `study/setStudySavedInCloud`, body, options);
  }

}
