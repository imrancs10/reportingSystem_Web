import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { FormsModule } from '@angular/forms';
import { ReportComponent } from './report.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class ReportModule { }
