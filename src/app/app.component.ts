import {Component} from '@angular/core';
import {DataService} from './data.service';
import {Subject} from 'rxjs/Subject';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  results: Array<any>;
  apiKey: string;
  languages: any;
  default: any;
  page: number;
  parameterForm: FormGroup;
  selectedLanguage: string;
  searchTerm: Subject<string>;

  // Create an instance of the DataService through dependency injection
  constructor(private dataService: DataService) {

    this.results = Array<any>();
    this.apiKey = '';
    this.languages = [
      {id: 'all', name: 'All'},
      {id: 'it-IT', name: 'Italiano'},
      {id: 'en-EN', name: 'English'}
    ];
    this.default = this.languages[0];
    this.page = 1;
    this.parameterForm = new FormGroup({
      languages: new FormControl(null),
      apiKey: new FormControl(null)
    });
    this.searchTerm = new Subject<string>();
    this.parameterForm.controls['languages'].setValue(this.default, {onlySelf: true});
    this.dataService.searchMovie(this.searchTerm, this.apiKey, this.selectedLanguage, this.page)
      .subscribe(results => {
        this.results = results;
      });

  }

  onSubmit() {
    // Access the Data Service's getUsers() method we defined
    this.dataService.discoverMovies(this.apiKey, this.selectedLanguage, this.page)
      .subscribe(results => {
        this.results = results;
      });
  }

  onScroll() {
    console.log(this.searchTerm, this.apiKey, this.selectedLanguage, this.page);
    this.dataService.searchMovie(this.searchTerm, this.apiKey, this.selectedLanguage, this.page)
      .subscribe(results => {
        this.results = results;
        console.log(this.results);
      });
  }

}
