import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit, OnDestroy {

  data: any = {};
  dataSubscription: Subscription;
  updateSubscription: Subscription;
  createSubscription: Subscription;
  createMode = false;
  statusCombobox = [
    {name: 'New'},
    {name: 'On Progress'},
    {name: 'Completed'}
  ];

  constructor(private dataService: DataService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.data.userId = sessionStorage.getItem('username');
    const username = this.router.snapshot.paramMap.get('username');
    const id = this.router.snapshot.paramMap.get('id');
    if (!(username && id)) {
      this.createMode = true;
    } else {
      this.dataSubscription = this.dataService.getTodoDetail(username, id).subscribe(data => {
        this.data = data;
      });
    }
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
    if (this.createSubscription) {
      this.createSubscription.unsubscribe();
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  createData() {
    this.createSubscription = this.dataService.createTodo(this.data).subscribe(a => {
      console.log(a);
      this.route.navigate(['my/todos']);
    });
  }

  updateData() {
    this.updateSubscription = this.dataService.updateTodo(this.data).subscribe(() => {
      this.route.navigate(['my/todos']);
    });
  }

}
