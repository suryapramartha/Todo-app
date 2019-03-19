import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private username = 'suryapramartha';
  private password = 'password';
  public user;
  constructor() { }

  authenticate(username, password) {
    if (username === this.username && password === this.password) {
      sessionStorage.setItem('username', username);
      return true;
    } else {
      return false;
    }
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
}
