import { Component, OnInit } from '@angular/core';
import { BussinessService } from 'src/app/services/bussiness.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  termsCondition: boolean = false;
  rowData: any = [];
  columnDefs: any = [];
  defaultColDef: any;
  constructor(
    public businessData: BussinessService,
  ) { }
  ngOnInit(): void {
    this.columnDefs = [
      { headerName: "Full Name", field: "fullName" },
      { headerName: "UHID/Patient ID", field: "uhid" },
      { headerName: "Ref By", field: "refby" },
      { headerName: "Gender", field: "gender" },
      { headerName: "Age", field: "age" },
      { headerName: "Mobile No", field: "mobileNo" },
      { headerName: "Date", field: "date" },
      // Add more columns as needed
    ];

    this.defaultColDef = {
      sortable: true,
      filter: true,
    };
    this.onGetAllData();
  }

  onGetAllData() {
    this.businessData.getAllDataFromDB().subscribe((res) => {
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
    this.businessData.downloadCSV(this.rowData);
  }
}
