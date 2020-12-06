import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user-service.service';
import { Login } from '../models/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
    });
  }
  login() {
    let login = new Login();
    login.email = this.loginForm.controls.email.value;
    login.password = this.loginForm.controls.password.value;
    this.userService.login(login).subscribe((data:any) => {
      this.userService.setAuhToken(data.token);
      this.router.navigate(['/']);
    });
  }
  
}
