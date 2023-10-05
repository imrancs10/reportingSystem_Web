import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BussinessService } from 'src/app/services/bussiness.service';
import { TermsconditionComponent } from 'src/app/shared/termscondition/termscondition.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { AlertService } from '../../_alert/alert.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  options = {
    autoClose: false,
    keepAfterRouteChange: false
};
  file: any;
  showPreview: boolean = false;
  @ViewChild('registerForm') registerForm!: NgForm
  termsCondition: boolean = false;
  constructor(public route: Router, public dialog: MatDialog, public business: BussinessService, public businessData: BussinessService,protected alertService: AlertService) { }
  ngOnInit(): void {
    this.termsCondition = false;
  }
  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }
  onClick(form: NgForm) {
    this.showPreview = true;
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
      "LogoFileName": this.file.name,
      "LogoBase64": ""
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      //console.log(reader.result);
      body.LogoBase64 = typeof (reader.result) == 'string' ? reader.result : "";
      this.businessData.registerUser(body).subscribe((response) => {
        // console.log(res);
        // this.pdfUrl = this.getSafeUrl(response);
        // this.onPdfLoad();
        //this.openMessageDialog("Successfully saved");
        this.showPreview = false;
        this.alertService.success('Successfully saved', this.options);
        form.reset();
      },
        error => {
           this.showPreview = false;
           this.alertService.error('Error Happens, please contact administrator', this.options);
          //this.openMessageDialog("Some Went Happen");
        });
    };
    // console.log(body);

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
  iframe: any;
  openMessageDialog(mesg: any) {
    let dialogRef = this.dialog.open(AlertComponent, {
      width: 'auto',
      height: 'auto',
      data: { msg: mesg },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reset') {
        document.body.removeChild(this.iframe);
        //this.onReset();
      }
    });
  }
}
