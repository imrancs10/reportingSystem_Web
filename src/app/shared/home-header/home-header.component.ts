import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  userId:any;
  canAccess:boolean=false;
  isAdminLogin: boolean=false;
  notificationCount:any=10;
  constructor(private route:Router,private auth:AuthService){
    
  }
  ngOnInit(): void {
    this.isAdminLogin = sessionStorage.getItem('Role') == 'Admin';
    this.canAccess=false;
    this.userId = sessionStorage.getItem("userId");
    if(this.userId){
      this.canAccess=true;
    }
    else this.canAccess=false;
  }
  onForgetPassword(){
    this.route.navigate(['home/change-password']);
  }
  onProfile(){
    this.route.navigate(['home/profile']);
  }

  onLogout() {
    this.auth.setUserRole('');
    sessionStorage.clear();
    this.route.navigate(['/login']);
  }

  onHelp(){
    this.route.navigate(['/contactus']);
  }

  onLogin(){
    this.route.navigate(['/login']);
  }

  onRegister(){
    this.route.navigate(['/register']);
  }

  openOrganizationPage() {
    this.route.navigate(['/organization']);
  }
  openDashboardPage(){
    this.route.navigate(['/dashboard']);
  }
  toggleBell(){
    console.log('open toggle');
    
  }

}
