import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getHello() {
    return this.http.get('http://localhost:8080/api/hello-world');
  }

  getTodoByUsername(username) {
    return this.http.get(`http://localhost:8080/api/todos/${username}`);
  }

  deleteTodoByUsername(username, todoId) {
    return this.http.delete(`http://localhost:8080/api/todos/${username}/${todoId}`);
  }

  getTodoDetail(username, todoId) {
    return this.http.get(`http://localhost:8080/api/todos/${username}/${todoId}`);
  }

  createTodo(data) {
    return this.http.post('http://localhost:8080/api/todos', data);
  }

  updateTodo(data) {
    return this.http.put('http://localhost:8080/api/todos', data);

  }
}

