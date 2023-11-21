import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { OrganizationComponent } from './organization.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [OrganizationComponent],
  imports: [
    CommonModule, 
    OrganizationRoutingModule, 
    AgGridModule,
    SharedModule,
    FormsModule,
  ]
})
export class OrganizationModule { }
