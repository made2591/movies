import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class DataService {

  apiUrl: string;
  httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.apiUrl = 'http://localhost:3000/api';
  }

  discoverMovies(api_key: string, language: string, page: number): Observable<any> {
    const body = { 'api_key' : api_key, 'language' : language, 'page' : page};
    return this.http.post(this.apiUrl + '/discover/movies', body, this.httpOptions);
  }

  searchMovie(terms: Observable<string>, api_key: string, language: string, page: number): Observable<any> {
    return terms.debounceTime(400).distinctUntilChanged().switchMap(term => this.searchEntries(term, api_key, language, page));
  }

  searchEntries(term, api_key, language, page) {
    const body = { 'term' : term, 'api_key' : api_key, 'language' : language, 'page' : page};
    return this.http.post(this.apiUrl + '/search', body, this.httpOptions);
  }

}
