import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PrinterList, PrinterObj} from '../model/printer';
import {Study} from '../model/study';
import {AppConstants} from '../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

  constructor(private http : HttpClient) { }

  getPrinters() : Observable<PrinterList> {
    let token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+token+''),
      params: new HttpParams().set('institution_site_id', '4').set('page_size', '30').set('page_number', '1')
    };

    return this.http.get<PrinterList>(AppConstants.baseURL + "printer/getPrinters", options);
  }

  postPrinter(name, ip, tray, institution, paper) : Observable<PrinterObj>{
     let body: {
      printer_name: string,
      printer_ip: string,
      printer_tray: string,
      printer_instituion_site_id: string,
      printer_is_deleted: string,
      printer_paper_type: string,
    };
     body = {
      printer_name:"printer_name",
      printer_ip:"123.123.123.123",
      printer_tray:"35",
      printer_instituion_site_id:"4",
      printer_is_deleted:"false",
      printer_paper_type:"1"
    };
    let token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    };

    return this.http.post<PrinterObj>(AppConstants.baseURL + "printer/createPrinter", body, options);
  }
}
