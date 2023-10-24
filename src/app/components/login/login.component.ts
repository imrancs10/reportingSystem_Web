import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  showPreview: boolean = false;
  userType: any = 'user';
  username: any = '';
  btnName:any='visibility';
  passText:any='password';
  showPassword:boolean=false;
  remeberMe: boolean = false;
  PasswordToolTip:any='Show Password';
  @ViewChild('loginForm') loginForm!: NgForm
  constructor(public route: Router, public auth: AuthService, protected alertService: AlertService) { }
  ngOnInit(): void {
    if (sessionStorage.getItem('User')) {
      console.log(sessionStorage.getItem('User'));
      let val = sessionStorage.getItem('User');
      this.username = val;
    }
  }
  onRadioChange(event: any) {
  }

  onUserLogin(form: NgForm) {
    if (form.invalid) return;
    this.showPreview = true;
    if (this.remeberMe) {
      sessionStorage.setItem('User', form.value.username);
    }
    let model = {
      "UserName": form.value.username,
      "Password": form.value.Password,
      "Role": "User"
    }
    this.auth.loginUser(model).subscribe((res) => {
      // console.log(res);
      //this.pdfUrl = this.getSafeUrl(pdfBlob);
      //this.onPdfLoad();
      this.auth.setUserRole('User');
      sessionStorage.setItem('userId', res?.userResponse?.id);
      sessionStorage.setItem('Role', 'User');
      sessionStorage.setItem('userName', form.value.username);
      sessionStorage.setItem('Name', res?.userResponse?.orgName);
      sessionStorage.setItem('orgLogoName', res?.userResponse?.orgLogoFileName);
      this.showPreview = false;
      this.route.navigate(['/home']);
    },
      error => {
        this.showPreview = false;
        this.alertService.error('User Name or Password are Incorrect.', this.options);
        console.log("Error")
      });


    // console.log('userlogin',form.value);
  }
  onRegister() {
    this.route.navigate(['/register']);
  }
  onShowPassword(){
    this.showPassword=!this.showPassword;
    if(this.showPassword){
      this.btnName='visibility_off';
      this.passText='text';
      this.PasswordToolTip='Hide Password';
    }
    else{
      this.btnName='visibility';
      this.passText='password';
      this.PasswordToolTip='Show Password';
    }
  }
}
