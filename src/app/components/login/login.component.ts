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
  userType: any = 'user';
  username: any = '';
  remeberMe: boolean = false;
  @ViewChild('loginForm') loginForm!: NgForm
  constructor(public route: Router, public auth: AuthService) { }
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
      sessionStorage.setItem('orgLogoName', res?.userResponse?.orgLogoFileName);
      this.route.navigate(['/report']);
    },
      error => {
        console.log("Error")
      });


    // console.log('userlogin',form.value);
  }
  onRegister() {
    this.route.navigate(['/register']);
  }
}
