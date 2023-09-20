import { Component, OnInit } from '@angular/core';
import { BussinessService } from 'src/app/services/bussiness.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  termsCondition:boolean=false;
  constructor(
    public businessData:BussinessService,
  ){}
  ngOnInit(): void {
    
  }
  
  onGetAllData(){
    this.businessData.getAllDataFromDB().subscribe((res)=>{
      this.businessData.downloadCSV(res);
    });
  }

}
