import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-success',
  templateUrl: './signup-success.component.html',
  styleUrls: ['./signup-success.component.css']
})
export class SignupSuccessComponent implements OnInit {
  username;
  constructor(private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.username = this.router.snapshot.paramMap.get('username');

  }

  login() {
    this.route.navigateByUrl('/login');
  }

}
