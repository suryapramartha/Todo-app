import { Subscription } from 'rxjs';
import { AppUser } from './../../models/app-user';
import { AuthService } from '../../services/auth.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  status;
  loginData: any = {};
  appUser: AppUser = null;
  errorMessage = 'Username or Password are incorrect';
  isValid = null;
  loginSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.status = this.authService.getErrorStatus();
    this.authService.setErrorStatus(null);
    if (this.status === 401) {
      this.status = 'Your session are expired';
    } else {
      this.status = null;
    }
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  /* login() {
    let isAuthenticated = this.authService.authenticate(this.loginData.username, this.loginData.password);
    if (isAuthenticated) {
      this.appUser = this.loginData;
      this.router.navigate(['my/todos']);
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  } */

  /* loginWithBasicAuth() {
    this.loginSubscription = this.authService.basicAuthentication(this.loginData.username, this.loginData.password)
    .subscribe(data => {
      this.appUser = this.loginData;
      this.router.navigate(['my/todos']);
      this.isValid = true;
    }, error => {
      this.isValid = false;
    });
  } */

  loginWithJWTAuth() {
    this.status = null;
    this.loginSubscription = this.authService.JWTAuthentication(this.loginData.username, this.loginData.password)
    .subscribe(data => {
      console.log(data)
      this.appUser = this.loginData;
      this.router.navigate(['my/todos']);
      this.isValid = true;
    }, error => {
      this.isValid = false;
    });
  }

}
