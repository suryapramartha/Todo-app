import { AuthService } from './../auth.service';
import { AppUser } from './../models/app-user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: any = {};
  appUser: AppUser = null;
  errorMessage = 'username or password are incorrect';
  isValid = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    let isAuthenticated = this.authService.authenticate(this.loginData.username, this.loginData.password);
    if (isAuthenticated) {
      this.appUser = this.loginData;
      this.router.navigate(['my/todos']);
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

}
