import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  data: any = {};
  errorMessage;

  constructor() { }

  ngOnInit() {
  }

  signUp() {
    console.log(this.data);
    if (this.data.password === this.data.retypePassword) {
    } else {
      this.errorMessage = 'Password does not match';
    }
  }
}
