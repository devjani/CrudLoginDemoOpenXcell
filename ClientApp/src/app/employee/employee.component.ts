import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dataSource: any;
  
  constructor(private employeeService: EmployeeService, private dialog: MatDialog,
    private router: Router, private eventService: EventService) { }

  ngOnInit() {
    this.getEmployees();
    this, this.eventService.subscribe('refreshEmployee', () => {
      this.getEmployees();
      this.dialog.closeAll();
    })
  }
  getEmployees() {
    this.dataSource = this.employeeService.getEmployees();
  }
  getEmpType(type:number) {
    return type === 1 ? 'Permanent' : 'PartTime';
  }
  getGender(type: number) {
    return type === 1 ? 'Male' : 'Female';
  }
  addEmployee() {
    const dialogref = this.dialog.open(AddEditEmployeeComponent, { width: '600px', height: '700px' });
    dialogref.componentInstance.refreshEmployees = this.getEmployees;
  }
  deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(data => {
        this.getEmployees();
      });
    }
  }
  updateEmployee(id) {
   const dialogref = this.dialog.open(AddEditEmployeeComponent, { width: '600px', height: '700px' });
    dialogref.componentInstance.employeeId = id;
    dialogref.componentInstance.refreshEmployees = this.getEmployees;
  }
}
