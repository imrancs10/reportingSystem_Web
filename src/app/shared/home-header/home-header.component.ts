import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BussinessService } from 'src/app/services/bussiness.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  userId:any;
  canAccess:boolean=false;
  isAdminLogin: boolean=false;
  notificationCount:any=0;
  allMessages:any=[];
  constructor(private route:Router,private auth:AuthService,public businesServ:BussinessService){
    
  }
  ngOnInit(): void {
    this.isAdminLogin = sessionStorage.getItem('Role') == 'Admin';
    this.canAccess=false;
    this.userId = sessionStorage.getItem("userId");
    if(this.userId) this.canAccess=true;
    else this.canAccess=false;

    this.businesServ.getAllNotifications().subscribe((res:any)=>{
      console.log(res);
      //unread read flag only show read mssgs....
      //array of mssgss along with date and time and info. milega response m..
      this.allMessages=res;
      this.notificationCount=res.length;
    },(error)=>{
      console.log(error);
    }
    )
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
    console.log('open bell');
    // All Messages API call
  }

}
