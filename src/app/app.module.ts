import { ConfirmationDialogService } from './services/confirmation-dialog.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/login/login.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FormsModule} from '@angular/forms';
import { TodoComponent } from './todos/todo/todo.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './services/data.service';
import { TodoFormComponent } from './todos/todo-form/todo-form.component';
import { ConfirmationDialogComponent } from './todos/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    TodoComponent,
    NotFoundComponent,
    TodoFormComponent,
    ConfirmationDialogComponent,
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
      {path: 'my/todos/:username/:id', component : TodoFormComponent, canActivate: [AuthGuardService]},
      {path: 'my/todos/:username', component : TodoComponent, canActivate: [AuthGuardService]},
      {path: 'my/new/todos', component : TodoFormComponent, canActivate: [AuthGuardService]},
      {path: 'my/todos', component : TodoComponent, canActivate: [AuthGuardService]},
      {path: '**', component : NotFoundComponent}
    ])
  ],
  providers: [
    LoginComponent,
    AuthService,
    AuthGuardService,
    DataService,
    ConfirmationDialogService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],

  entryComponents: [ConfirmationDialogComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
