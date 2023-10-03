import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// declare var bootstrap: any; 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdminLogin: boolean = false;
  constructor(public route: Router, public auth: AuthService) { }
  ngOnInit(): void {
    this.isAdminLogin = sessionStorage.getItem('Role') == 'Admin';
  }
  openOrganizationPage() {
    this.route.navigate(['/organization']);
  }
  onLogout() {
    this.auth.setUserRole('');
    sessionStorage.clear();
    this.route.navigate(['/login']);
  }

}
