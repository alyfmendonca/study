import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstants} from "../AppConstants";
import {Token} from "../model/token";
import {Observable} from "rxjs";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
  export class AuthService {

  constructor(private http : HttpClient, private storage:LocalStorageService) { }

  postAuth(login, password) : Observable<Token>{
    const body = {
      "username": login,
      "password": password
    };
    return this.http.post<Token>(AppConstants.baseURL + "signIn", body);
  }

  remember(token){
    this.storage.store('token', token);
  }

  logout() {
    this.storage.clear('token')
  }

  getToken(){
    return this.storage.retrieve('token')
  }

}
