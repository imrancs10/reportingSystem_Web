import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { DashboardComponent } from './dashboard.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    DashboardRoutingModule, 
    AgGridModule
  ]
})
export class DashboardModule { }
