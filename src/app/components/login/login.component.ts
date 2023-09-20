import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userType:any='user';
  username:any='';
  remeberMe:boolean=false;
  @ViewChild('loginForm') loginForm!:NgForm
  constructor(public route:Router,public auth:AuthService){}
  ngOnInit(): void {
    if(sessionStorage.getItem('User')){
      console.log(sessionStorage.getItem('User'));
      let val=sessionStorage.getItem('User');
      this.username=val;
    }
  }
  onRadioChange(event:any){
  }
  
  onUserLogin(form:NgForm){
    if(form.invalid) return;
    if(this.remeberMe){
      sessionStorage.setItem('User',form.value.username);
    }
    this.auth.setUserRole('user');
    this.route.navigate(['/report']);
    // console.log('userlogin',form.value);
  }
  onRegister(){
    this.route.navigate(['/register']);
  }
}
