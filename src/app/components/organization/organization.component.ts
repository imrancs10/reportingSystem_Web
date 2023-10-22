import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_alert';
import { BussinessService } from 'src/app/services/bussiness.service';

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
  termsCondition: boolean = false;
  rowData: any = [];
  columnDefs: any = [];
  defaultColDef: any;
  showPreview: boolean = false;
  constructor(
    public businessData: BussinessService, protected alertService: AlertService
  ) { }
  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: 'Send Email', field: 'notes', editable: true, resizable: true, width: 120,
        cellRenderer: function (params: { value: string; }) {
          return '<span><i class="material-icons" style="cursor: pointer;margin-left: 35%;">email</i></span>'
        }
      },
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
  onRowClicked(e: any) {
    if (!e.event.target)
      return;
    let data = e.data;
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
      this.showPreview = false;
      this.alertService.success('Email Sent Successfully', this.options);
    },
      error => {
        this.showPreview = false;
        this.alertService.error('Error happens, please contact IT Administrator', this.options);
        //this.openMessageDialog("Some Went Happen");
      });
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
