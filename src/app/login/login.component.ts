import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  employeeSubscription!: Subscription;
  
  constructor(private employeeService: EmployeeService, private router: Router) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login() {
    this.employeeSubscription = this.employeeService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['myproject']);
      },
      error => {
        console.error('Error during login', error);
        alert('Giriş başarısız');
      }
    );
  }
  
  ngOnDestroy() {
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
  }
}
