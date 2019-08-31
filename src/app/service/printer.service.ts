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
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOiIyMDE5LTA3LTA5VDE5OjA2OjAyLjY2NVoiLCJpYXQiOjE1NjI3MDk5MDZ9.pC0JLhHlJ81GOCkZKltkStbgleW-AZaW1GIIEIAvBs4'),
      params: new HttpParams().set('institution_site_id', '4').set('page_size', '3').set('page_number', '1')
    };

    return this.http.get<PrinterList>(AppConstants.baseURL + "printer/getPrinters", options);
  }

  postPrinter(name, ip, tray, institution, paper) : Observable<PrinterObj>{
    const body = {
      "printer_name": name,
      "printer_ip": ip,
      "printer_tray": tray,
      "printer_instituion_site_id": institution,
      "printer_is_deleted": false,
      "printer_paper_type": paper,
    };
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOiIyMDE5LTA3LTA5VDE5OjA2OjAyLjY2NVoiLCJpYXQiOjE1NjI3MDk5MDZ9.pC0JLhHlJ81GOCkZKltkStbgleW-AZaW1GIIEIAvBs4'),
    };

    return this.http.post<PrinterObj>(AppConstants.baseURL + "printer/createPrinter/", body, options);
  }
}
