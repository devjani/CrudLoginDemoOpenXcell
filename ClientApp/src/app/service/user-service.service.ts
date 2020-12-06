import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError  } from 'rxjs';
import { User } from '../models/user';
import { retry, catchError } from 'rxjs/operators';
import { Login } from '../models/login';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  appUrl: string;
  apiUrl: string;
  userApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.appUrl = environment.appUrl;
    this.apiUrl = 'api/Account/';
    this.userApiUrl = 'api/User/';
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.appUrl + this.apiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  login(login: Login) {
    return this.http.post<Login>(this.appUrl + this.apiUrl, JSON.stringify(login), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  getAuthToken() {
    return localStorage.getItem('auth-token') || null;
  }

  setAuhToken(token: string) {
    localStorage.setItem('auth-token', token);
  }
  logout(token: string) {
    localStorage.removeItem('auth-token');
  }
  addUser(user:User): Observable<User> {
    return this.http.post<User>(this.appUrl + this.userApiUrl, JSON.stringify(user),this.httpOptions)
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
