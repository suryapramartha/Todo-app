import { API_URL_LOCAL } from './../app.constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getHello() {
    return this.http.get(`${API_URL_LOCAL}/hello-world`);
  }

  getTodoByUsername(username) {
    return this.http.get(`${API_URL_LOCAL}/todos/${username}`);
  }

  deleteTodoByUsername(username, todoId) {
    return this.http.delete(`${API_URL_LOCAL}/todos/${username}/${todoId}`);
  }

  getTodoDetail(username, todoId) {
    return this.http.get(`${API_URL_LOCAL}/todos/${username}/${todoId}`);
  }

  createTodo(data) {
    return this.http.post(`${API_URL_LOCAL}/todos`, data);
  }

  updateTodo(data) {
    return this.http.put(`${API_URL_LOCAL}/todos`, data);

  }
}

