import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, retryWhen, delay, take } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    return next.handle(req).pipe(
      retryWhen(errors => errors.pipe(
        delay(3000), 
        take(5) 
      )),
      tap(event => {
        if (event instanceof HttpResponse) {
          this.loaderService.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Hata durumunda loader'ı kapatmayacağız, çünkü yeniden denemelere izin vereceğiz
        return throwError(error);
      })
    );
  }
}



