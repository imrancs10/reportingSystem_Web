import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { BussinessService } from 'src/app/services/bussiness.service';

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
  constructor(private route:Router,protected alertService: AlertService,public business:BussinessService){}

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  ngOnInit(): void {
    
  }

  onChangePassword(form:NgForm){
    // console.log(form.value);
    if(form.invalid) return;
    if(this.newPassword!=this.renewPassword){
      this.alertService.error('Please check new password is not same as Re-Enter password ', this.options);
      return;
    }
    if(this.oldPassword===this.newPassword){
      this.alertService.error("New Password never be same as Old Password",this.options);
      return;
    }
    let model={
      "oldPassword": form.value.oldPassword,
      "newPassword": form.value.newPassword,
    }
    this.business.changePasswordFunc(model).subscribe((res:any)=>{
      if(res){
        // console.log("done");
        this.alertService.success("Password Changed",this.options);
        form.reset();
        // this.route.navigate(['/home']);
      }
      else{
        this.alertService.error("Something Went Wrong",this.options);
        return;
      }
    },error=>{
      this.alertService.error(error.error.Message,this.options);
      return;
    })
    
    // change password API
    // this.route.navigate(['/home']);
  }
}
