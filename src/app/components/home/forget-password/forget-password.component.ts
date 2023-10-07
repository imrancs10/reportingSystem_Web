import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  @ViewChild('passwordForm') passwordForm!: NgForm;
  oldPassword:any;
  newPassword:any;
  renewPassword:any;
  constructor(private route:Router){}

  ngOnInit(): void {
    
  }

  onChangePassword(form:NgForm){
    console.log(form.value);
    if(form.invalid) return;
    // change password API
    this.route.navigate(['/home']);
  }
}
