import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/_alert';
import { BussinessService } from 'src/app/services/bussiness.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  displayedColumns: string[] = ['sendemail','header', 'name', 'email', 'firstName','lastName','mobile','state','city','pinCode'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  rowData: any = [];
  showHeader:any=true;
  constructor(
    public businessData: BussinessService, protected alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.onGetAllData();
  }

  sendEmailToOrganization(e:any){
    // console.log(e);
    let data = e;
    let body = {
      "Name": data.name,
      "Email": data.email,
      "FirstName": data.firstName,
      "LastName": data.lastName,
      "State": data.state,
      "City": data.city,
      "PinCode": data.pincode,
      "Mobile": data.mobile,
    }
    this.businessData.sendEmailtoOrganization(body).subscribe((response) => {
      this.alertService.success('Email Sent Successfully', this.options);
    },
      error => {
        this.alertService.error('Error happens, please contact IT Administrator', this.options);
      });
  }

  onChangeHeader(data:any){
    let body ={
      "organizationId": data.id,
      "name": data.name,
      "email": data.email,
      "firstName": data.firstName,
      "lastName": data.lastName,
      "mobile": data.mobile,
      "state": data.state,
      "city": data.city,
      "pinCode": data.pinCode,
      "showHeader":data.showHeader,
    }
    this.businessData.updateOrgnizationHeader(body).subscribe((res:any)=>{
      console.log(res);
      this.alertService.success('Header changes on report successfully', this.options);
    },error=>{
      console.log(error);
      this.alertService.error('Error happens, please contact IT Administrator', this.options);
    }
    )
    
  }
  
  onGetAllData() {
    this.businessData.getAOrgDataFromDB().subscribe((res) => {
      this.rowData = res;
      this.dataSource=new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  exportData() {
    this.businessData.downloadCSV(this.rowData, "organization_detail");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
