import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler) {

    let basicAuth = this.authService.getToken();
    let username = this.authService.getAuthenticatedUser();

    if (basicAuth && username) {
    request = request.clone({
      setHeaders : {
        Authorization: basicAuth
      }
    });
  }
    return next.handle(request);
  }

}
