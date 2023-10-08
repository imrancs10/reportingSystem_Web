import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
<<<<<<< HEAD
  todayYear:any;
  OrganizationName:any;
  constructor(public route:Router){
    let date=new Date();
    this.todayYear=date.getFullYear()
  }
  ngOnInit(): void {
    
  }
=======
  constructor(public route:Router){}
  ngOnInit(): void {
    
  }
  onReport(){
    this.route.navigate(['/home/report']);
  }
>>>>>>> main
}
