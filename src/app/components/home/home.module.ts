import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
<<<<<<< HEAD
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from '../login/auth.guard';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
=======
>>>>>>> main

const routes:Routes=[
  {
<<<<<<< HEAD
    path: 'change-password',
    component: ForgetPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[AuthGuard],
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
];
=======
    path:'',component:HomeComponent,
  }
]

>>>>>>> main

@NgModule({
<<<<<<< HEAD
  declarations: [HomeComponent, ForgetPasswordComponent, ProfileComponent],
  imports: [CommonModule, SharedModule, FormsModule, RouterModule.forChild(routes)],
=======
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
>>>>>>> main
})
export class HomeModule { }
