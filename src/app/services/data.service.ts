import { API_URL } from './../app.constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getHello() {
    return this.http.get(`${API_URL}/hello-world`);
  }

  getTodoByUsername(username) {
    return this.http.get(`${API_URL}/todos/${username}`);
  }

  deleteTodoByUsername(username, todoId) {
    return this.http.delete(`${API_URL}/todos/${username}/${todoId}`);
  }

  getTodoDetail(username, todoId) {
    return this.http.get(`${API_URL}/todos/${username}/${todoId}`);
  }

  createTodo(data) {
    return this.http.post(`${API_URL}/todos`, data);
  }

  updateTodo(data) {
    return this.http.put(`${API_URL}/todos`, data);

  }
}

