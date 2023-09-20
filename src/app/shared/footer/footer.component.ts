import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(){}
  todayYear:any;
  ngOnInit(): void {
    let date=new Date();
    this.todayYear=date.getFullYear();
  }
}
