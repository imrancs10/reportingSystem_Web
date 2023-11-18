import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/_alert';
import { BussinessService } from 'src/app/services/bussiness.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name:any;
  fname:any;
  lname:any;
  email:any;
  phone:any;
  city:any;
  state:any;
  pincode:any;
  newLogo:any;
  LogofileName: any;
  constructor(public business:BussinessService,public alert:AlertService){}
  ngOnInit(): void {
    this.prePopulate();
  }
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  prePopulate(){
    this.business.getOrgDataFromDB().subscribe((res:any)=>{
      console.log(res);
      this.name=res.name;
      this.email=res.email;
      this.fname=res.firstName;
      this.lname=res.lastName;
      this.phone=res.mobile;
      this.city=res.city;
      this.pincode=res.pinCode;
      this.state=res.state;
      this.newLogo=`http://api.imgdotpix.in/OrganizationLogo/${res.logoFileName}`;
      this.LogofileName=res.logoFileName;
    })
  }

  onSettingsForm(form:NgForm){
    // console.log(form.value);
    let body={
      "name": form.value.name,
      "email": form.value.email,
      "firstName": form.value.fname,
      "lastName": form.value.lname,
      "mobile": form.value.phone,
      "state": form.value.state,
      "city": form.value.city,
      "pinCode": form.value.pincode,
      "logoFileName": this.LogofileName,
      "logoBase64":"",
    }
    body.logoBase64=this.newLogo;
    // console.log(body);
    this.business.updateOrgProfileData(body).subscribe((res:any)=>{
      // console.log(res);
      
    },error=>{
      this.alert.error('Error Please try again',this.options);
    })
  }


  file:any;
  changeLogoEvent(event:any){
    if (
      event.target.files[0].type === 'image/svg+xml' ||
      event.target.files[0].type === 'image/jpeg' ||
      event.target.files[0].type === 'image/png'
    ) {
      this.file = event.target.files[0];
      console.log(this.file);
      
    } else {
      alert('Invalid File Format. Please Choose jpeg/png/svg/xml format');
      event.target.value = '';
      this.file = '';
      return;
    }
  }

}
