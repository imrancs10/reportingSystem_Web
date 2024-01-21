import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BussinessService } from 'src/app/services/bussiness.service';
import { ReportComponent } from 'src/app/shared/report/report.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  todayYear:any;
  OrganizationName:any;
  showArrow:boolean=false;
  displayedColumns: string[] = ['id','date', 'name', 'refby', 'uhid','view','edit'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isProd:boolean=true;
  constructor(public route:Router,public business:BussinessService,public dialog: MatDialog,private sanitizer: DomSanitizer){
  }

  ngOnInit(): void {
    this.getOrgReportsData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ReportComponent);
  }

  getFormatDate(date:any){
    return date.split('T')[0];
  }

  getOrgReportsData(){
    this.business.getReportsOfOrg().subscribe((res:any)=>{
      console.log('Search report API',res);
      this.dataSource=new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    
  }

  private getSafeUrl(blob: Blob): any {
    const unsafeUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }
  pdfUrl:any;
  showPreview:boolean=false;
  onViewReport(item:any){
    console.log(item);
    // this.showPreview = true;
    // this.business.saveDataToDB(item).subscribe((response) => {
    //   this.pdfUrl = this.getSafeUrl(response);
    //   this.onPdfLoad();
    //   this.showPreview = false;
    // },
    //   error => {
    //     this.showPreview = false;
    //     // this.openDialog('pdfError');
    //   });
  }

  iframe: any;

  onPdfLoad(): void {
    this.iframe = document.createElement('iframe');
    this.iframe.style.visibility = 'hidden';
    this.iframe.src = this.pdfUrl.changingThisBreaksApplicationSecurity;
    document.body.appendChild(this.iframe);

    this.iframe.onload = () => {
      this.iframe.contentWindow?.print();
      setTimeout(() => {
        this.showPreview = false;
      }, 2000);
      setTimeout(() => {
        // this.openDialog('reset');
      }, 5000);
    };

  }

  onEditReport(item:any){
    console.log(item);
    this.openDialog();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
