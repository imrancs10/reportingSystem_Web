import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes=[
  {
<<<<<<< HEAD
    path: 'change-password',
    component: ForgetPasswordComponent,
    canActivate: [AuthGuard],
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
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
