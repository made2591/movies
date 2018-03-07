import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { environment } from "../../environments/environment";
import { User } from "../interfaces/models";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: User;
  message: string;
  httpOptions: any;
  data: any;
  
  constructor(private http: HttpClient, private router: Router) {
    this.user = new User();
    this.message = '';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
  }

  ngOnInit() {
  }
  
  login() {
    this.http.post(environment.apiUrl + '/api/signIn', JSON.stringify(this.user), this.httpOptions).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      this.router.navigate(['recommended']);
    }, err => {
      this.message = err.error.msg;
    });
  }
  
}
