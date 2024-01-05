import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../login/auth.guard';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path:'report',
    component:GenerateReportComponent,
    title:"Chest X-Ray Report - ImgDotPix",
    canActivate:[AuthGuard],
  },
  {
    path: '',
    pathMatch:'full',
    redirectTo:'report',
  },
  {
    path:'**',
    redirectTo:'report',
  }
];


@NgModule({
  declarations: [
    ProductsComponent,
    GenerateReportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class ProductsModule { }
