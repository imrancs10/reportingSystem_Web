import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { OrganizationComponent } from './organization.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [OrganizationComponent],
  imports: [
    CommonModule, 
    OrganizationRoutingModule, 
    AgGridModule,
    SharedModule
  ]
})
export class OrganizationModule { }
