import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginData: any;
  message: string;
  data: any;
  
  constructor(private http: HttpClient, private router: Router) {
    this.loginData = { username:'', password:'' };
    this.message = '';
  }

  ngOnInit() {
  }
  
  login() {
    this.http.post(environment.apiUrl + '/api/signIn',this.loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      this.router.navigate(['recommended']);
    }, err => {
      this.message = err.error.msg;
    });
  }
  
}
