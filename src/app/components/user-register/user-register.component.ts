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
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  file: any;
  showPreview: boolean = false;
  @ViewChild('registerForm') registerForm!: NgForm;
  termsCondition: boolean = false;
  allStates:any=[];
  constructor(
    public route: Router,
    public dialog: MatDialog,
    public business: BussinessService,
    public businessData: BussinessService,
    protected alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.termsCondition = false;
    this.allStates = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal"
    ];
    
  }
  onFilechange(event: any) {
    if (!event.target.files) {
      this.alertService.error('Please Upload Organization Logo',this.options)
      return;
    }
    // console.log(event.target.files[0]);
    if (
      event.target.files[0].type === 'image/svg+xml' ||
      event.target.files[0].type === 'image/jpeg' ||
      event.target.files[0].type === 'image/png'
    ) {
      this.file = event.target.files[0];
    } else {
      this.alertService.error('Invalid File Format. Please Choose jpeg/png/svg/xml format',this.options)
      event.target.value = '';
      this.file = '';
      return;
    }
  }
  onClick(form: NgForm) {
    if (!this.termsCondition || form.invalid) return;
    if (!this.file || this.file == '' || this.file.name == '') return;
    this.showPreview = true;
    //logic for generate the UserName by Raghav Garg
    let name = form.value.fname[0] + form.value.lname[0];
    let username =
      name +
      Math.floor(Math.random() * 10) +
      Math.floor(Math.random() * 10) +
      Math.floor(Math.random() * 10);
    let pass = this.business.getPass();
    let body = {
      Name: form.value.organization_name,
      Email: form.value.gmail,
      FirstName: form.value.fname,
      LastName: form.value.lname,
      State: form.value.state,
      City: form.value.city,
      PinCode: form.value.Pincode,
      Mobile: form.value.phone,
      username: username,
      Password: pass,
      LogoFileName: this.file.name,
      LogoBase64: '',
    };
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      //console.log(reader.result);
      body.LogoBase64 = typeof reader.result == 'string' ? reader.result : '';
      this.businessData.registerUser(body).subscribe(
        (response) => {
          // console.log(res);
          // this.pdfUrl = this.getSafeUrl(response);
          // this.onPdfLoad();
          //this.openMessageDialog("Successfully saved");
          this.showPreview = false;
          this.alertService.success('Successfully saved', this.options);
          form.reset();
        },
        (error) => {
          this.showPreview = false;
          this.alertService.error(
            'Error happens, please contact administrator',
            this.options
          );
          //this.openMessageDialog("Some Went Happen");
        }
      );
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'accept') {
        this.termsCondition = true;
      } else this.termsCondition = false;
    });
  }
  iframe: any;
  openMessageDialog(mesg: any) {
    let dialogRef = this.dialog.open(AlertComponent, {
      width: 'auto',
      height: 'auto',
      data: { msg: mesg },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'reset') {
        document.body.removeChild(this.iframe);
        //this.onReset();
      }
    });
  }
}
