import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './shared/alert/alert.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { SharedModule } from './shared/shared.module';
import { TokenInterceptorService } from './TokenInterceptorService';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { OrganizationComponent } from './components/organization/organization.component';
import { AlertModule } from './_alert';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from '../app/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    DashboardComponent,
    AdminDashboardComponent,
    UserRegisterComponent,
    OrganizationComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    AgGridModule,
    AlertModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
