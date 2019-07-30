import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../AppConstants";
import {Study} from "../model/study";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class StudyService {

  constructor(private http : HttpClient, private authService : AuthService) { }

  getStudies() : Observable<Study[]> {

    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOiIyMDE5LTA3LTA5VDE5OjA2OjAyLjY2NVoiLCJpYXQiOjE1NjI3MDk5MDZ9.pC0JLhHlJ81GOCkZKltkStbgleW-AZaW1GIIEIAvBs4'),
      params: new HttpParams().set('id', '4')
    }

    return this.http.get<Study[]>(AppConstants.baseURL + "institutionSite/getStudiesById", options);
  }

}
