import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  requestCount = 0;

  constructor(private spinnerService: SpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.startRequest()

    return next.handle(request).pipe(
      finalize( () => this.endRequest())
    );
  }

  private startRequest(): void {
    // If this is the first request,start the spinner
    if (this.requestCount == 0) 
      this.spinnerService.show();

    this.requestCount++;
  }

  private endRequest(): void {
    // No request ongoing, so make sure we don’t go to negative count.
    // Should never happen, but it is better to be safe than sorry.
    if (this.requestCount == 0)
        return;

    this.requestCount--;
    // If it was the last request, call the service to stop the spinner.
    if (this.requestCount == 0)
      this.spinnerService.hide();
  }
}
