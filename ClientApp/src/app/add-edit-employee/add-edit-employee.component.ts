import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../models/Employee';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  @Input() employeeId: any;
  @Input() refreshEmployees:any;
  private handler = new Subject<any>();
  constructor(private fb: FormBuilder, private employeeService: EmployeeService,
    private router: Router, protected activeModel: MatDialogRef<AddEditEmployeeComponent>,private eventService:EventService) { }
  ngOnInit() {
    this.initializeForm();
    
  }
  initializeForm() {
    this.employeeForm = this.fb.group({
      name: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      contactNo: new FormControl('', Validators.required),
      employmentType: new FormControl('', Validators.required),
      gender: new FormControl("1", Validators.required),
    });
    if (this.employeeId) {
      this.employeeService.getEmployee(this.employeeId).subscribe(data => {
        this.employeeForm.patchValue({
          name: data.name,
          company: data.company,
          contactNo: data.contactNo,
          employmentType: data.employmentType,
          gender:data.gender.toString()
        });
      });
    }
  }
  save() {
    debugger
    if (this.employeeForm.valid) {
      const employee = new Employee();
      employee.name = this.employeeForm.controls.name.value;
      employee.company = this.employeeForm.controls.company.value;
      employee.employmentType = +this.employeeForm.controls.employmentType.value;
      employee.contactNo = this.employeeForm.controls.contactNo.value;
      employee.gender = +this.employeeForm.controls.gender.value;
      this.addUpdateUser(employee);
    }
  }
  addUpdateUser(employee: Employee) {
    if (!this.employeeId) {
      this.employeeService.saveEmployee(employee).subscribe((data) => {
        if (data) {
          this.eventService.broadcast('refreshEmployee', true);
        }
      });
    }
    else {
      employee.employeeId = this.employeeId;
      this.employeeService.updateEmployee(this.employeeId, employee).subscribe((data) => {
        this.eventService.broadcast('refreshEmployee',true);
        //this.activeModel.close();
      });
    }
  }

}
