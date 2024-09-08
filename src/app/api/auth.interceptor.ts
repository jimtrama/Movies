import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';
import { ErrorService } from '../Services/error.service';
import { Router } from '@angular/router';
import { REFRESH_ENDPOINT } from './api.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private errorService: ErrorService, 
    private router: Router,
    private accountService:AccountService,
    private http:HttpClient
    ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const key = this.accountService.key;
    let newRequest = undefined;
    if (key != '') {
      newRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${key}` },
      });
    }

    return next.handle(!!newRequest ? newRequest : request).pipe(
      catchError((err) => {
        
        if (err.statusText == 'Unauthorized') {

          if(this.accountService.refreshLink != ""){
            this.http.post(REFRESH_ENDPOINT,{refresh:this.accountService.refreshLink})
            .subscribe((res:any)=>{
              if(!!res.access){
                  this.accountService.updateKey(res.access)
              }else{
                this.router.navigate(['login']);
              }
            })
          }else{
            this.router.navigate(['login']);
          }

          
        }

        if (!!err.error && Object.keys(err.error).length >= 1) {
          for (let key of Object.keys(err.error)) {
            this.errorService.emit.next({ key, desc: err.error[key] });
          }
        }
        throw err;
      })
    );
  }
}
