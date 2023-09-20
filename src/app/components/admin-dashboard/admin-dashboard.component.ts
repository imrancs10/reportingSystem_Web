import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  
  @ViewChild('adminForm') adminForm!:NgForm;

  constructor(public route:Router,public auth:AuthService){}
  ngOnInit(): void {
    
  }

  onClick(form:NgForm){
    if(form.invalid){
      return;
    }
    this.auth.setUserRole('admin');
    // this.route.navigate(['/dashboard']);
    // console.log(form.value);
  }

}
