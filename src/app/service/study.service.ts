import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../AppConstants";
import {Study, StudyFilter} from '../model/study';
import { PrintReq } from '../model/pintResponse';
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class StudyService {

  constructor(private http : HttpClient, private authService : AuthService) { }

  getStudies() : Observable<StudyFilter> {

    const body = {
      "institution_site_id": 4,
      "study_date": null,
      "accession_number": null,
      "patient_id": null,
      "physician_id": null,
      "study_description": null,
      "modality_id": null,
      "equipment_id": null,
      "patient_name": "m",
      "page_size": 10,
      "page_number": 1
    };
    let token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };

    return this.http.post<StudyFilter>(AppConstants.baseURL + "study/filterExamsWithCount", body, options);
  }

  getFormattedImage(id: string){
    let token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      params: new HttpParams().set('patient_id', id)
    };
    return this.http.get<string[]>(AppConstants.baseURL + "formattedImage/getFormattedImagesFromStudy", options);
  }

  getStudySeries(accessionNumber: string) : Observable<Study[]>{
    const body = {
      "accession_number": accessionNumber
    };
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOiIyMDE5LTA3LTA5VDE5OjA2OjAyLjY2NVoiLCJpYXQiOjE1NjI3MDk5MDZ9.pC0JLhHlJ81GOCkZKltkStbgleW-AZaW1GIIEIAvBs4'),
    };
    return this.http.post<Study[]>(AppConstants.baseURL + "study/getStudySeries", body, options)
  }

  sendPrint(file: PrintReq){
    //let token = localStorage.getItem('token');
    // var fileReq: PrintReq = {
    //   printer_id: 2,
    //   file: file,
    // }
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${AppConstants.baseURLImage}pdf/uploadImage`, file, {headers});
  }

  getImages(id){
    //let token = localStorage.getItem('token');
    // var fileReq: PrintReq = {
    //   printer_id: 2,
    //   file: file,
    // }
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<String[]>(AppConstants.baseURL + `image/getImagesFromSerie?serie_id=${id}`, {headers});
  }
}
