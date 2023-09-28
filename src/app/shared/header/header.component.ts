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

  constructor(public route: Router, public auth: AuthService){}
  ngOnInit(): void {
  
  }

  onLogout(){
    this.auth.setUserRole('');
      this.route.navigate(['/login']);
  }

}
