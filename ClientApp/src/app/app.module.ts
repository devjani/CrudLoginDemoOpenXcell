import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatCardModule, MatDialogModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { EmployeeComponent } from './employee/employee.component';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component'  
import { EventService } from './service/event.service';
import { AuthGuard } from '../core/auth-guard';
import { ResponseInterceptor } from '../core/interceptors/response-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UserComponent,
    LoginComponent,
    AddEditUserComponent,
    EmployeeComponent,
    AddEditEmployeeComponent
   
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: EmployeeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
      { path: 'counter', component: CounterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'employees', component: EmployeeComponent,canActivate:[AuthGuard] },
      { path: 'register', component: AddEditUserComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    NoopAnimationsModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ResponseInterceptor,multi:true}
    , EventService, AuthGuard],
  entryComponents: [AddEditUserComponent, AddEditEmployeeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
