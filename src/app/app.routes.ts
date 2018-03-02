import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

// Route Configuration
export const routes: Routes = [
  { path: 'home', component: AppComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
