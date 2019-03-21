import { AuthService } from './../../services/auth.service';
import { DataService } from '../../services/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subscription: Subscription;
  message;
  logged;
  constructor(private data: DataService, private authService: AuthService) { }

  ngOnInit() {
    this.logged = sessionStorage.getItem('username');
  }

  getHello() {
    this.subscription = this.data.getHello().subscribe((response: any) => {
      this.message = response.message;

    }, (error: Response) => {
      this.authService.logoutWithStatus(error.status);
    });
  }

}
