import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { OrganizationComponent } from './organization.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    OrganizationRoutingModule, 
    AgGridModule
  ]
})
export class OrganizationModule { }
