import { API_URL } from './../app.constants';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user;
  private errorStatus;
  constructor(private http: HttpClient, private route: Router) { }


  private basicAuthentication(username, password) {
    let basicAuth = 'Basic ' + window.btoa(username + ':' + password);
    let headers = new HttpHeaders({
      Authorization : basicAuth
    });

    return this.http.get(`${API_URL}/basic-auth`, {headers}).pipe(
      map(() => {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('token', basicAuth);
      })
    );

  }

  createUsers(data) {
    return this.http.post(`${API_URL}/auth/signup`, data);
  }

  JWTAuthentication(user, pass) {
    let data: any = {
      username : user,
      password : pass
    };
    return this.http.post(`${API_URL}/auth/signin` , data).pipe(
      map((x: any) => {
        sessionStorage.setItem('username', user);
        sessionStorage.setItem('token', 'Bearer ' + x.token);
      })
    );
  }


  getAuthenticatedUser() {
    return sessionStorage.getItem('username');
  }

  getToken() {
    if (this.getAuthenticatedUser) {
      return sessionStorage.getItem('token');
    }
  }

  setErrorStatus(status) {
    this.errorStatus = status;
  }

  getErrorStatus() {
    return this.errorStatus;
  }

  isLoggedIn() {
    let user = sessionStorage.getItem('username');
    if (user) {
      this.user = user;
      return true;
    } else {
      return false;
    }
  }
  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    this.route.navigate(['login']);
  }

  logoutWithStatus(status) {
    this.setErrorStatus(status);
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    this.route.navigate(['login']);
  }

}
