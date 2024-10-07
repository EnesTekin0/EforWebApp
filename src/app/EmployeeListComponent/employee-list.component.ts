import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDto } from '../services/employee-dto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeDto[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

    // Tüm çalışanları yükleme
  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data: EmployeeDto[]) => {
        this.employees = data;
      },
      error => {
        console.error('Error loading employees', error);
      }
    );
  }

  editEmployee(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['update', id]);
    }
  }
  
  deleteEmployee(id: number | undefined) {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.employeeService.deleteEmployee(id).subscribe(
          () => {
            console.log('Employee deleted successfully');
            this.loadEmployees();
          },
          error => {
            console.error('Error deleting employee', error);
          }
        );
      }
    }
    }
    
    goToCreateEmployeeForm() {
      this.router.navigate(['create']);
    }
  }