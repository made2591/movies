import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonMaterialModule } from "./common-material/common-material.module";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { TheaterMoviesComponent } from './theater-movies/theater-movies.component';
import { RecommendedMoviesComponent } from './recommended-movies/recommended-movies.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signUp', component: SignupComponent, pathMatch: 'full' },
  { path: 'popular', component: PopularMoviesComponent },
  { path: 'search', component: SearchMoviesComponent },
  { path: 'theater', component: TheaterMoviesComponent },
  { path: 'recommended', component: RecommendedMoviesComponent },
  { path: '', redirectTo: 'popular', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PopularMoviesComponent,
    SearchMoviesComponent,
    TheaterMoviesComponent,
    RecommendedMoviesComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonMaterialModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
