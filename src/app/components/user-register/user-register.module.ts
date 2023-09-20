import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterRoutingModule } from './user-register-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,UserRegisterRoutingModule,SharedModule
  ]
})
export class UserRegisterModule { }
