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

  changeLogoEvent(event:any){
    console.log(event);
    
  }

}
