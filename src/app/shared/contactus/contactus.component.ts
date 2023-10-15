import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent {
  constructor(public route:Router){}

  onRegister() {
    this.route.navigate(['/register']);
  }
  onLogin(){
    this.route.navigate(['/login']);
  }

}
