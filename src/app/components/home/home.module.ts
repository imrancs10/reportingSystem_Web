import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from '../login/auth.guard';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'change-password',
    component: ForgetPasswordComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [HomeComponent, ForgetPasswordComponent],
  imports: [CommonModule, SharedModule, FormsModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
