import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterRoutingModule } from './user-register-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRegisterComponent } from './user-register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserRegisterComponent],
  imports: [
    CommonModule,
    UserRegisterRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class UserRegisterModule { }
