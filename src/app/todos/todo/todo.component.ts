import { ConfirmationDialogService } from './../../services/confirmation-dialog.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  username;
  listSubscription: Subscription;
  deleteSubscription: Subscription;
  listTodo;
  userId;
  deletedMessage;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService) {
    this.userId = this.authService.user;

    this.listSubscription = this.dataService.getTodoByUsername(this.userId).subscribe(response => {
      this.listTodo = response;
    }, (error: Response) => {
      this.authService.logoutWithStatus(error.status);
    });

  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
    if ( this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
  ngOnInit() {
  }

  deleteById(username, todoId) {
    this.confirmationDialogService.confirm('Deleting item', 'Do you really want to delete this item?')
    .then((confirm) => {
      if (confirm) {
        this.deleteSubscription = this.dataService.deleteTodoByUsername(username, todoId).subscribe(data => {
          this.deletedMessage = 'Successfully deleted!';
          this.listSubscription = this.dataService.getTodoByUsername(this.userId).subscribe(response => {
            this.listTodo = response;
          });
          setTimeout(() => {
            this.deletedMessage = null;
          },
          1500);
        }, (error: Response) => {
          this.authService.logoutWithStatus(error.status);
        });
      }
    }).catch(() => console.log('cancelled'));
  }

  updateTodo(username, todoId) {
    this.router.navigate([`my/todos/${username}/${todoId}`]);

  }

  newTodo() {
    this.router.navigate(['my/new/todos']);
  }

}
