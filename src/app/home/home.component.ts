import { DataService } from './../data.service';
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
  constructor(private data: DataService) { }

  ngOnInit() {
  }

  getHello() {
    this.subscription = this.data.getHello().subscribe((response: any) => {
      this.message = response.message;

    });
  }

}
