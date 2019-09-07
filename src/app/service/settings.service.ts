import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../AppConstants";
import {Study} from "../model/study";
import { PrintReq } from '../model/pintResponse';
import { getModalidades } from '../model/getModalidades';
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


  
}
