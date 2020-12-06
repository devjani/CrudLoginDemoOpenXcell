import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Employee } from '../models/Employee';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Employee/';
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getEmployee(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(this.myAppUrl + this.myApiUrl + employeeId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveEmployee(Employee): Observable<Employee> {
    return this.http.post<Employee>(this.myAppUrl + this.myApiUrl, JSON.stringify(Employee), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateEmployee(employeeId: number, Employee): Observable<Employee> {
    return this.http.put<Employee>(this.myAppUrl + this.myApiUrl + employeeId, JSON.stringify(Employee), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteEmployee(employeeId: number): Observable<Employee> {
    return this.http.delete<Employee>(this.myAppUrl + this.myApiUrl + employeeId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
