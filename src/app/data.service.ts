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
    return this.http.get('http://localhost:8080/api/todos/' + username);
  }
}

