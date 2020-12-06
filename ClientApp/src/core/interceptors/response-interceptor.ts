import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor, HttpRequest, HttpHandler,
  HttpEvent, HttpResponse, HttpErrorResponse, HttpUserEvent
} from '@angular/common/http';

import { BehaviorSubject, Observable, throwError, EMPTY } from 'rxjs';
import { filter, switchMap, catchError, finalize, take, tap } from 'rxjs/operators';
import { UserService } from '../../app/service/user-service.service';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private authService: UserService,
    private router: Router,
  ) {
    this.isRefreshingToken = false;
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
    } else {
      return req;
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(req, this.authService.getAuthToken())).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event
        }
      }));
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler, err: HttpErrorResponse) {

    return this.logoutUser('');
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.logoutUser(error);
    }
    // return Observable.throw(error);
    return throwError(error);
  }

  logoutUser(err: any) {
    this.authService.logout('');
    this.router.navigate(['/login']);
    // Here we are returning empty observable as we don't want to throw error from logout
    // https://stackoverflow.com/questions/38548407/return-an-empty-observable/47600725#47600725
    return EMPTY;
  }
}
