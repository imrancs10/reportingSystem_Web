import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';

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
  constructor(private route:Router,protected alertService: AlertService){}

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  ngOnInit(): void {
    
  }

  onChangePassword(form:NgForm){
    console.log(form.value);
    if(form.invalid) return;
    if(this.newPassword!=this.renewPassword){
      this.alertService.error('Please check new password is not same as Re-Enter password ', this.options);
    }
    // change password API
    // this.route.navigate(['/home']);
  }
}
