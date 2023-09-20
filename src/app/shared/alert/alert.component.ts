import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BussinessService } from 'src/app/services/bussiness.service';
// import {Papa} from 'ngx-papaparse';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit{
  constructor(
    // public csvConverter:Papa,
    @Inject(MAT_DIALOG_DATA) public data: {msg: string},public business:BussinessService){}
  ngOnInit(): void {}

  onDownlad(){ //By Raghav Garg
  //   let data=this.business.getAllPatientData();
  //   let csv=this.csvConverter.unparse([data]);
  //   const blob= new Blob([csv],{type:'text/csv'});
  //   const url=window.URL.createObjectURL(blob);
  //   const link=document.createElement('a');
  //   link.href=url;
  //   link.download='data.csv';
  //   link.click();
  //   window.URL.revokeObjectURL(url);
  }
}
