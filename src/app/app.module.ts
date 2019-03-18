import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule} from '@angular/forms';
import { TodoComponent } from './todo/todo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    TodoComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([
      {path: '', component : HomeComponent},
      {path: 'login', component : LoginComponent},
      {path: 'my/todos/:username', component : TodoComponent, canActivate: [AuthGuardService]},
      {path: 'my/todos', component : TodoComponent, canActivate: [AuthGuardService]},
      {path: '**', component : NotFoundComponent}
    ])
  ],
  providers: [LoginComponent, AuthService, AuthGuardService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
