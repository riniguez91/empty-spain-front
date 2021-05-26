import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Session } from '../models/session.model';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const session: Session = this.storageService.loadSessionData();
    // Check if there is a token since it could be an HttpRequest that requires no token
    let authReq = request;
    if (session) {
      // Clone the request to add the new header
      authReq = request.clone({ 
        headers: authReq.headers.append('Authorization', session['access_token'])
      });
    }

    // Send the newly created request
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // 401 is expired token
        if (error.status === 401) {
          this.storageService.logout();
          this.storageService.setLoggedIn(false);
        }
        return throwError(error);
      })
    );

  }
}
