import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../AppConstants";
import {Study} from "../model/study";
import { PrintReq } from '../model/pintResponse';
import { getModalidades, singleDicomTag } from '../model/getModalidades';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http : HttpClient, private authService : AuthService) { }

  getModalidades(){
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
    return this.http.get<getModalidades>(`${AppConstants.baseURL}configuration/getConfigurationFromInstitutionSiteById`, {headers});
  }

  getPositions(){
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
    return this.http.get<any>(`${AppConstants.baseURL}tagPositioning/getAll?current_index=0&next_index=500`, {headers});
  }

  deletePositionin(id) : Observable<any>{
    
    let token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/x-www-form-urlencoded'),
    };

    return this.http.delete<any>(AppConstants.baseURL + `tagPositioning/deleteTagPositioning?id=${id}`, options);
  }


  createPositionin(item: singleDicomTag, posicao) : Observable<any>{
    let token = localStorage.getItem('token');

    let body: any = {
      institution_fk: item.institution_fk,
      dicom_tag_id_fk: item.n_dicom_tags_id,
      positioning: posicao,
      modality_fk: item.fk_modality
    };
    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    };

    return this.http.post<any>(AppConstants.baseURL + `tagPositioning/createTagPositioning`, body, options);
  }

  updatePositionin(item: singleDicomTag, posicao) : Observable<any>{
    let token = localStorage.getItem('token');

    let body: any = {
      id: item.tag_positioning_id,
      institution_fk: item.institution_fk,
      dicom_tag_id_fk: item.n_dicom_tags_id,
      positioning: posicao,
      modality_fk: item.fk_modality,
      last_update: item.last_update,
    };
    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    };

    return this.http.put<any>(AppConstants.baseURL + `tagPositioning/updateTagPositioning`, body, options);
  }


  
}
