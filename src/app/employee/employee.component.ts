import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDto } from '../services/employee-dto.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { LoaderService } from '../services/loader.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'groups',
    'hireDate',
    'activeEmployees',
    'actions',
  ];
  dataSource = new MatTableDataSource<EmployeeDto>();
  employees: EmployeeDto[] = [];
  filterActive = true;
  isLoading: boolean = false;
  sortColumn: string = '';
  sortDirection: string = 'asc';
  options = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };

  employeeSubscription!: Subscription;
  loaderSubscription!: Subscription;
  dialogSubscription!: Subscription;
  deleteSubscription!: Subscription;

  deleteSuccess: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderSubscription = this.loaderService
      .getLoaderState()
      .subscribe((state) => {
        this.isLoading = state;
      });
    this.loadEmployees();
  }

  loadEmployees() {
    this.loaderService.show(); // Loader'ı gösteriyoruz
    this.employeeSubscription = this.employeeService.getEmployee().subscribe(
      (data: EmployeeDto[]) => {
        this.dataSource.data = data;
        this.sortEmployees();
        this.loaderService.hide(); // Başarı durumunda loader'ı gizliyoruz
      },
      (error) => {
        console.error('Error loading employees', error);
        // this.loaderService.hide(); // Hata durumunda loader'ı kapatıyoruz
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
      this.router.navigate(['employeeupdate', id]);
    }
  }

  deleteEmployee(id: number | undefined) {
    if (id !== undefined) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent);

      this.dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.deleteSubscription = this.employeeService
            .deleteEmployee(id)
            .subscribe(
              () => {
                console.log('Employee deleted successfully');
                this.deleteSuccess = true;

                setTimeout(() => {
                  this.deleteSuccess = false;
                  this.router.navigate(['employee']);
                }, 4000);
                this.loadEmployees();
              },
              (error) => {
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
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
}