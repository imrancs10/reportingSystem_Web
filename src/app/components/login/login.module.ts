import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';



@NgModule({
  declarations: [LoginComponent,AdminDashboardComponent],
  imports: [
    CommonModule,LoginRoutingModule,SharedModule,FormsModule
  ]
})
export class LoginModule { }
