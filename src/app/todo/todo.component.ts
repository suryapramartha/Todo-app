import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  username;
  subscription: Subscription;
  listTodo;
  userId;

  constructor(private dataService: DataService, private authService: AuthService) {
    this.userId = this.authService.user;

    this.subscription = this.dataService.getTodoByUsername(this.userId).subscribe(response => {
      this.listTodo = response;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }

}
