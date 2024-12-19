import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  // loginForm: FormGroup<any>;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  login() {
    this.employeeService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['myproject']);
      },
      error => {
        console.error('Error during login', error);
        alert('Giriş başarısız');
      }
    );
  }
}
