import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BussinessService } from 'src/app/services/bussiness.service';
import { TermsconditionComponent } from 'src/app/shared/termscondition/termscondition.component';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm
  termsCondition: boolean = false;
  constructor(public route: Router, public dialog: MatDialog, public business: BussinessService, public businessData: BussinessService) { }
  ngOnInit(): void {
    this.termsCondition = false;
  }

  onClick(form: NgForm) {
    if (!this.termsCondition || form.invalid) return;
    //logic for generate the UserName by Raghav Garg 
    let name = form.value.fname[0] + form.value.lname[0];
    let username = name + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
    let pass = this.business.getPass();
    let body = {
      "Name": form.value.organization_name,
      "Email": form.value.gmail,
      "FirstName": form.value.fname,
      "LastName": form.value.lname,
      "State": form.value.state,
      "City": form.value.city,
      "PinCode": form.value.Pincode,
      "Mobile": form.value.phone,
      "username": username,
      "Password": pass,
      "LogoFileName": ""
    }
    // console.log(body);
    this.businessData.registerUser(body).subscribe((response) => {
      // console.log(res);
      // this.pdfUrl = this.getSafeUrl(response);
      // this.onPdfLoad();
      //this.showPreview = false;
    },
      error => {
        // this.showPreview = false;
        // this.openDialog('pdfError');
      });
    //data save table main  and navigate home
    //this.onLogin();
  }

  onLogin() {
    this.route.navigate(['/login']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(TermsconditionComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'accept') {
        this.termsCondition = true;
      }
      else this.termsCondition = false;
    });
  }

}
