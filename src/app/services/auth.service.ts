import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { setup } from './setup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: any;
  constructor(public http: HttpClient) {
    if (setup.production) {
      this.apiUrl = setup.API_URL;
    }
    else {
      this.apiUrl = setup.API_URL_LOCAL;
    }
  }
  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$: Observable<string> = this.userRoleSubject.asObservable();

  setUserRole(role: string) {
    console.log(role);
    this.userRoleSubject.next(role);
  }
  loginUser(model: any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    return this.http.post(this.apiUrl + 'Auth/user/login', model, { headers: httpHeaders }).pipe(
      map(this.extractData),
      catchError(this.handleErrorObservable)
    );
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post(this.apiUrl + 'PatientReport/add/ReportingSystem', model, { headers });
  }
  private extractData(res: any) {
    let body = res;
    return body;
  }
  private handleErrorObservable(error: any) {
    console.error(error.message || error);
    return throwError(error);
  }
}
