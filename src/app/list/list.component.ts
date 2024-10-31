import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDto } from '../services/employee-dto.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit, OnDestroy {
  employees: EmployeeDto[] = [];
  filterInactive = false;
  sortColumn: string = ''; 
  sortDirection: string = 'asc'; 

  employeeSubscription!: Subscription;

  
  deleteSuccess:boolean=false;

  constructor(private employeeService: EmployeeService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

 
  loadEmployees() {
    this.employeeSubscription = this.employeeService.getEmployee().subscribe(
      (data: EmployeeDto[]) => {
        this.employees = data;
        this.sortEmployees();
      },
      error => {
        console.error('Error loading employees', error);
      }
    );
  }

  
  sortEmployees() {
    let directionMultiplier = this.sortDirection === 'asc' ? 1 : -1;

    this.employees.sort((a, b) => {
      if (this.sortColumn === 'id') {
       
        const idA = a.employeeId || 0; 
        const idB = b.employeeId || 0;
        return (idA - idB) * directionMultiplier;
      } else if (this.sortColumn === 'firstName') {
        return a.firstName.localeCompare(b.firstName) * directionMultiplier;
      }
      return 0;
    });
  }

  
  onSortColumn(column: string) {
    if (this.sortColumn === column) {
      
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      
      this.sortColumn = column;
      this.sortDirection = 'asc'; 
    }
    this.sortEmployees(); 
  }

  editEmployee(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['update', id]);
    }
  }

  deleteEmployee(id: number | undefined) {
    if (id !== undefined) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.employeeService.deleteEmployee(id).subscribe(
            () => {
              console.log('Employee deleted successfully');
              this.deleteSuccess = true;

              setTimeout(() => {
                this.deleteSuccess = false;
                this.router.navigate(['/list']);
              }, 4000);
              this.loadEmployees();
            },
            error => {
              console.error('Error deleting employee', error);
            }
          );
        }
      });
    }
  }

  goToCreateEmployeeForm() {
    this.router.navigate(['register']);
  }

  ngOnDestroy() {
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
  }
}
