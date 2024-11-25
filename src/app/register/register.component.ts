import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDto } from '../services/employee-dto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChangeDetectionStrategy } from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';


import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';


const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [
    provideMomentDateAdapter(),
  ],
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule,
     ReactiveFormsModule, MatInputModule, 
    MatButtonModule, MatCardModule, CommonModule,
     MatCheckboxModule, FormsModule, MatRadioModule, MatDividerModule, MatIconModule, FormsModule],

})
export class RegisterComponent {



  employeeForm: FormGroup;
  readonly date = new FormControl(moment([2017, 0, 1]));
  createSuccess: boolean = false;
  updateSuccess: boolean = false;
  createError: boolean = false;
  employeeSubscription!: Subscription
  isEditMode: boolean = false;
  id: number | null = null;
  private _snackBar = inject(MatSnackBar);

  message: string = 'Kullanıcı oluşturuldu';



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder 
  ) { 
    this.employeeForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      groups: [''],
      hireDate: [new Date()],
      activeEmployees: [true],
    });
  }


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = +id;
      this.isEditMode = true;
      this.loadEmployee(this.id);
    }
  }


  loadEmployee(id: number) {
    this.employeeSubscription = this.employeeService.getEmployeeById(id).subscribe(
      (employee: EmployeeDto) => {
        this.employeeForm.patchValue(employee); 
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
    this.employeeSubscription = this.employeeService.postEmployee(this.employeeForm.value).subscribe(
      response => {
        console.log('Employee created successfully', response);


        this.createSuccess = true;

        setTimeout(() => {
          this.createSuccess = false;
          this.router.navigate(['employee']);
        }, 700);

      },
      error => {
        console.error('Error creating employee', error);
        this.createError = true;

        setTimeout(() => {
          this.createError = false;
          this.router.navigate(['register']);
        }, 6000);
      }
    );
  }

  updateEmployee(id: number) {
    this.employeeSubscription = this.employeeService.updateEmployee(id, this.employeeForm.value).subscribe(
      response => {
        console.log('Employee updated successfully', response);

        this.updateSuccess = true;

        setTimeout(() => {
          this.updateSuccess = false;
          this.router.navigate(['employee']);
        }, 1000);
      },
      error => {
        console.error('Error updating employee', error);
      }
    );
  }

  // enterEffort(id: number | undefined) {
  //   if (id !== undefined) {
  //     this.router.navigate(['effort']);
  //   }
  // }

  ngOnDestroy() {
    ""
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
  }

}