import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../service/user-service.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  userForm: FormGroup;
  @Input() userName: any;
  constructor(private fb: FormBuilder, private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.email),
      password: new FormControl('',Validators.required),
      confirmPassword: new FormControl('',Validators.required),
      phone: new FormControl('', Validators.required)
    }, { validator: this.passwordConfirming }
    );
  }
  passwordConfirming(c: AbstractControl): { passwordMismatch: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { passwordMismatch: true };
    }
  }
  addUser() {
    const user = new User();
    user.userName = this.userForm.controls.email.value;
    user.password = this.userForm.controls.password.value;
    user.contactNo = this.userForm.controls.phone.value;
    debugger
    const addUser = this.userService.addUser(user).subscribe((data) => {
      this.router.navigate(['/']);
    });;
  }
}
