import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule],
})
export class MymaterialModule { }
