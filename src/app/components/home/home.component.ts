import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BussinessService } from 'src/app/services/bussiness.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  todayYear:any;
  OrganizationName:any;
  showArrow:boolean=false;
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','view','edit'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isProd:boolean=false;
  constructor(public route:Router,public business:BussinessService){
  }

  ngOnInit(): void {
    this.getOrgReportsData();
  }

  getOrgReportsData(){
    // this.business.getReportsOfOrg().subscribe((res:any)=>{
    // })
    let res=[
      {id:'1',name:'raaj',progress:'12',fruit:'2'}
    ];
    this.dataSource=new MatTableDataSource(res)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onViewReport(item:any){
    console.log(item);
  }

  onEditReport(item:any){
    console.log(item);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
