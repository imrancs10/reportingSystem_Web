import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  todayYear:any;
  constructor(public route:Router){
    let date=new Date();
    this.todayYear=date.getFullYear()
  }
  ngOnInit(): void {
    
  }
  onForgetPassword(){
    this.route.navigate(['home/change-password']);
  }
  onProfile(){}
}
