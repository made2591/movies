import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { TMDBResponse, TMDBMovie } from "./interfaces/models";
import "rxjs/Rx";

@Injectable()
export class DataService {

  private _apiBaseUrl = "http://localhost:4200";
  private _discoverUrl = "/discover/movies";
  
  constructor(private http: Http) { }
  
  getMostPopular(): Observable<TMDBResponse[]> {
    return this.http.get(this._apiBaseUrl + this._discoverUrl).map((response: Response) => {
        return <TMDBResponse>response.json();
      })
      .catch(this.handleError);
  }
  
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
  
}
