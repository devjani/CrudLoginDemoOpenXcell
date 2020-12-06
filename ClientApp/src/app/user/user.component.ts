import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { MatDialog } from '@angular/material';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { UserService } from '../service/user-service.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataSource: any;
  displayedColumns = ['UserName', 'Email', 'ContactNo']
  url: string;
  httpClient: HttpClient;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private userService:UserService,private dialog:MatDialog) {
   
  }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.dataSource = this.userService.getUsers();
  }
  addUser() {
    this.dialog.open(AddEditUserComponent, { width: '600px', height: '700px' });
    //this.httpClient.post<User>(this.url + 'api/account', JSON.stringify(null), this.httpOptions).subscribe(result => {
    //  this.dataSource = result;
    //}, error => console.error(error));
  }
}
