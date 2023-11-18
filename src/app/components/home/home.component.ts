import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  todayYear:any;
  OrganizationName:any;
  showArrow:boolean=false;
  constructor(public route:Router){
  }
  ngOnInit(): void {
    
  }
  // navigateToAnotherPage(){
  //   this.route.navigate(['/report']);
  // }
}
