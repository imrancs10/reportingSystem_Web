import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  showPreview: boolean = false;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  @ViewChild('adminForm') adminForm!: NgForm;

  constructor(public route: Router, public auth: AuthService, protected alertService: AlertService) { }
  ngOnInit(): void {

  }

  onClick(form: NgForm) {
    this.showPreview = true;
    if (form.invalid) {
      return;
    }
    let model = {
      "UserName": form.value.UserName,
      "Password": form.value.Password,
      "Role": "Admin"
    }
    this.auth.loginUser(model).subscribe((res) => {
      // console.log(res);
      //this.pdfUrl = this.getSafeUrl(pdfBlob);
      //this.onPdfLoad();
      //this.auth.setUserRole('Admin');
      this.showPreview = false;
      sessionStorage.setItem('userId', res?.userResponse?.id);
      sessionStorage.setItem('Role', 'Admin');
      sessionStorage.setItem('userName', form.value.username);
      this.route.navigate(['/dashboard']);
    },
      error => {
        this.showPreview = false;
        this.alertService.error('User Name or Password are Incorrect.', this.options);
        console.log("Error")
      });

    // this.route.navigate(['/dashboard']);
    // console.log(form.value);
  }

}
