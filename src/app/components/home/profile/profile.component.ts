import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  constructor(public business:BussinessService){}
  ngOnInit(): void {
    this.prePopulate();
  }

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
      this.newLogo=res.logoFileName;
    })
  }

  onSettingsForm(form:NgForm){
    console.log(form.value);
  }


  file:any;
  changeLogoEvent(event:any){
    if (
      event.target.files[0].type === 'image/svg+xml' ||
      event.target.files[0].type === 'image/jpeg' ||
      event.target.files[0].type === 'image/png'
    ) {
      this.file = event.target.files[0];
    } else {
      alert('Invalid File Format. Please Choose jpeg/png/svg/xml format');
      event.target.value = '';
      this.file = '';
      return;
    }
  }

}
