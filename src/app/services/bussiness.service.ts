import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { setup } from './setup';
// import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
  providedIn: 'root'
})
export class BussinessService {
  apiUrl: any;
  constructor(public http: HttpClient) {
    if (setup.production) {
      this.apiUrl = setup.API_URL;
    }
    else {
      this.apiUrl = setup.API_URL_LOCAL;
    }
    // console.log(this.apiUrl);
  }
  private allPatientData: any;

  savePatientData(data: any) {
    this.allPatientData = data;
    // console.log(this.allPatientData, 'from service');
  }

  getAllPatientData() {
    return this.allPatientData;
  }

  getPdf(): Observable<Blob> {
    let body = this.allPatientData;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'wordfile/', body, { headers, responseType: 'blob' })
      .pipe(
        catchError(this.handleError)
      );
  }

  saveDataToDB(model: any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    return this.http.post(this.apiUrl + 'PatientReport/add/ReportingSystem', model, { headers: httpHeaders, responseType: 'blob' }).pipe(
      map(this.extractData),
      catchError(this.handleErrorObservable)
    );
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post(this.apiUrl + 'PatientReport/add/ReportingSystem', model, { headers });
  }

  registerUser(model: any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    return this.http.post(this.apiUrl + 'Auth/user/orgregister', model, { headers: httpHeaders }).pipe(
      map(this.extractData),
      catchError(this.handleErrorObservable)
    );
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post(this.apiUrl + 'PatientReport/add/ReportingSystem', model, { headers });
  }

  changePasswordFunc(model: any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    return this.http.post(this.apiUrl + 'Auth/user/changePassword', model, { headers: httpHeaders }).pipe(
      map(this.extractData),
      catchError(this.handleErrorObservable)
    );
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post(this.apiUrl + 'PatientReport/add/ReportingSystem', model, { headers });
  }

  sendEmailtoOrganization(model: any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    return this.http.post(this.apiUrl + 'Auth/user/sendEmail', model, { headers: httpHeaders }).pipe(
      map(this.extractData),
      catchError(this.handleErrorObservable)
    );
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post(this.apiUrl + 'PatientReport/add/ReportingSystem', model, { headers });
  }

  getAOrgDataFromDB(): Observable<any> {
    return this.http.get(this.apiUrl + 'Auth/get/organizationDetail/');
  }
  getAllDataFromDB(): Observable<any> {
    return this.http.get(this.apiUrl + 'PatientReport/get/patientReport/');
  }

  getOrgDataFromDB(): Observable<any> {
    return this.http.get(this.apiUrl + 'Auth/get/profile');
  }

  updateOrgProfileData(body:any):Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    return this.http.put(this.apiUrl + 'Auth/user/updateprofile',body,{ headers: httpHeaders });
  }

  updateOrgnizationHeader(body:any):Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    return this.http.put(this.apiUrl + 'Auth/user/showHeader',body,{ headers: httpHeaders });
  }

  //incompletes
  postMessage(values:any){
    console.log(values);
    let body={
      "contactedOrgName": values.contactedOrgName,
      "contactedUserName": values.contactedUserName,
      "contactedEmail": values.contactedEmail,
      "contactedMsg": values.contactedMsg,
      "date":new Date(),
    }
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    return this.http.post(this.apiUrl+'',body,{ headers: httpHeaders });
  }

  getAllNotifications(){
    return this.http.get(this.apiUrl+'');
  }

  getReportsOfOrg(){
    return this.http.get(this.apiUrl+'');
  }

  
  private extractData(res: any) {
    let body = res;
    return body;
  }
  private handleErrorObservable(error: any) {
    console.error(error.message || error);
    return throwError(error);
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

  downloadCSV(data: any, fileName: any) {
    if (!data) {
      console.error('No data to download.');
      return;
    }
    // console.log('data',data);
    const csv = this.convertToCSV(data);
    // console.log('csv',csv);
    if (!csv) {
      console.error('Error converting data to CSV format.');
      return;
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Create a download link
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName + '.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  private convertToCSV(data: any[]): string {
    const csvRows = [];
    if (!data || data.length === 0) {
      return '';
    }
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
    data.forEach(item => {
      const values = headers.map(header => item[header] !== undefined ? item[header] : '');
      csvRows.push(values.join(','));
    });
    return csvRows.join('\n');
  }

  public getPass() {
    return this.generateHexadecimalPassword(12);
  }

  private generateHexadecimalPassword(length: any) {
    const hexChars = '0123456789ABCDEF';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * hexChars.length);
      password += hexChars.charAt(randomIndex);
    }
    return password;
  }
}
