import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  color = 'primary';
  checked = false;
  disabled = false;
  forgotPasswordLink = "forgotpassword";
  login = "";
  password = "";
  token;

  constructor(private router: Router, private authService : AuthService) { }

  ngOnInit() {
    this.token = this.authService.getToken();
    if(this.token != null){
      this.handleLogin(this.token);
    }
  }

  onClick(){

    if( this.login.length == 0 ) {
      Swal.fire('', 'Para fazer login, digite um e-mail!', 'error');
      return;
    }

    if( this.password.length == 0 ) {
      Swal.fire('', 'Para fazer login, digite uma senha!', 'error');
      return;
    }

    this.authService.postAuth(this.login, this.password)
      .subscribe(
        data => {
          this.handleLogin(data)
        },
        error => {
          Swal.fire('Erro ao fazer login!', 'Usuário ou senha incorretos!', 'error')
        }
      );

  }

  handleLogin(token){
    if(this.checked){
      console.log('aqui salvando');
      this.authService.remember(token)
    }
    this.router.navigate(['/home']);
  }

}
