import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  selectedOption = 3;

  constructor(private route: ActivatedRoute, private router: Router, private authService : AuthService) { }

  ngOnInit() {
    let url = this.router.url;
    switch (url) {
      case '/home/print':
        this.selectedOption = 1;
            break;
      case '/home/formatted':
        this.selectedOption = 2;
        break;
      case '/home/nonformatted':
        this.selectedOption = 3;
        break;
      case '/home/settings':
        this.selectedOption = 4;
        break;
    }
    this.optionSelected(this.selectedOption)
  }

  optionSelected(i){
    this.selectedOption = i;
    switch (i) {
      case 0:
        break;
      case 1:
        this.router.navigate(['print'], {relativeTo: this.route});
        break;
      case 2:
        this.router.navigate(['formatted'], {relativeTo: this.route});
        break;
      case 3:
        this.router.navigate(['nonformatted'], {relativeTo: this.route});
        break;
      case 4:
        this.router.navigate(['settings'], {relativeTo: this.route});
        break;
      case 5:
        this.logout();
        break;
    }
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  }

}
