import { Component, OnInit } from '@angular/core';

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
  constructor(){}
  ngOnInit(): void {
    // API to fetch Organization Fields and Data
    //
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
