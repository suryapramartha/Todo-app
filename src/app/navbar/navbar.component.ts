import { AuthService } from './../auth.service';
import { AppUser } from './../models/app-user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser;
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.appUser = this.authService.user;
  }

  logout() {
    sessionStorage.removeItem('username');
  }

}
