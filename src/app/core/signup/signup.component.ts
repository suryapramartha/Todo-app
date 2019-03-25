import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  data: any = {};
  signupSubscription: Subscription;
  errorMessage;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    if (this.signupSubscription) {
      this.signupSubscription.unsubscribe();
    }
  }

  signUp() {
    this.data.role = ['user'];
    console.log(this.data);
    if (this.data.password === this.data.retypePassword) {
      this.signupSubscription = this.authService.createUsers(this.data).subscribe((x: any) => {
        console.log(x.message);
        this.router.navigate(['/signup/', this.data.username]);
      }, error => {
        this.errorMessage = error.error.message;
      });
    } else {
      this.errorMessage = 'Password does not match';
    }
  }
}
