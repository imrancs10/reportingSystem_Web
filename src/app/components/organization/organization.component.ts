import { Component, OnInit } from '@angular/core';
import { BussinessService } from 'src/app/services/bussiness.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  termsCondition: boolean = false;
  rowData: any = [];
  columnDefs: any = [];
  defaultColDef: any;
  constructor(
    public businessData: BussinessService,
  ) { }
  ngOnInit(): void {
    this.columnDefs = [
      { headerName: "Orgnization Name", field: "name" },
      { headerName: "Email", field: "email" },
      { headerName: "First Name", field: "firstName" },
      { headerName: "Last Name", field: "lastName" },
      { headerName: "Mobile", field: "mobile" },
      { headerName: "State", field: "state" },
      { headerName: "City", field: "city" },
      { headerName: "PinCode", field: "pinCode" },
      { headerName: "Password", field: "password" },
    ];

    this.defaultColDef = {
      sortable: true,
      filter: true,
    };
    this.onGetAllData();
  }

  onGetAllData() {
    this.businessData.getAOrgDataFromDB().subscribe((res) => {
      this.rowData = res;
      // this.rowData = [
      //   { name: "Task 1", start_date: "2023-05-29 06:00:00", end_date: "2023-06-20 06:00:00" },
      //   { name: "Task 2", start_date: "2023-05-30 06:00:00", end_date: "2023-06-21 06:00:00" },
      //   { name: "Task 3", start_date: "2023-05-31 06:00:00", end_date: "2023-06-22 06:00:00" },
      // ];
      //this.businessData.downloadCSV(res);
    });
  }
  exportData() {
    this.businessData.downloadCSV(this.rowData, "organization_detail");
  }
}
