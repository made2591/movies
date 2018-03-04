import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signupData: any;
  message: any;
  httpOptions: any;
  
  constructor(private http: HttpClient, private router: Router) {
    this.signupData = { username:'', password:'' };
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
  
  signup() {
    this.http.post(environment.apiUrl + '/api/signup', this.signupData, this.httpOptions).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['login']);
    }, err => {
      console.log(err);
      this.message = err.error.msg;
    });
  }
  
}
