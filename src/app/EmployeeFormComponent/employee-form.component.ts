import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDto } from '../services/employee-dto.model';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit{
  employee: EmployeeDto = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    groups: [],
    hireDate: new Date(),
    inactiveEmployees: false
  };

  isEditMode: boolean = false;
  id: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

    ngOnInit(): void {
    // URL'den çalışan ID'sini al ve mevcut çalışanı yükle
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = +id;  // 'id' null değilse number'a dönüştür
      this.isEditMode = true;
      this.loadEmployee(this.id);
    }
  }

  loadEmployee(id: number) {
    this.employeeService.getEmployeeById(id).subscribe(
      (employee: EmployeeDto) => {
        this.employee = employee;  // API'den gelen employee zaten id içerir
      },
      error => {
        console.error('Error loading employee', error);
      }
    );
  }

  submitEmployee() {
    if (this.isEditMode && this.id) {
      this.updateEmployee(this.id);
    } else {
      this.createEmployee();
    }
  }

  createEmployee() {
    this.employeeService.postEmployee(this.employee).subscribe(
      response => {
        console.log('Employee created successfully', response);
        this.router.navigate(['/employees']);
      },
      error => {
        console.error('Error creating employee', error);
      }
    );
  }

  updateEmployee(id: number) {
    this.employeeService.updateEmployee(id, this.employee).subscribe(
      response => {
        console.log('Employee updated successfully', response);
        this.router.navigate(['/employees']);
      },
      error => {
        console.error('Error updating employee', error);
      }
    );
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
