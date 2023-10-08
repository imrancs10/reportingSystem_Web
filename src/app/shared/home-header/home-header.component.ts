import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  constructor(private route:Router,private auth:AuthService){}
  ngOnInit(): void {
    
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

}
