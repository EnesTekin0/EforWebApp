import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDto } from '../services/employee-dto.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'groups', 'hireDate', 'activeEmployees', 'actions'];
  dataSource = new MatTableDataSource<EmployeeDto>();
  employees: EmployeeDto[] = [];
  filterActive = true;
  sortColumn: string = ''; 
  sortDirection: string = 'asc'; 
    options={
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    };

  employeeSubscription!: Subscription;

  
  deleteSuccess:boolean=false;

  constructor(private employeeService: EmployeeService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

 
  loadEmployees() {
    this.employeeSubscription = this.employeeService.getEmployee().subscribe(
      (data: EmployeeDto[]) => {
        this.dataSource.data = data;
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
                this.router.navigate(['employee']);
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


// import { Component, ViewChild } from '@angular/core';
// import { SimpleNotificationsComponent } from 'angular2-notifications';
// import { NotificationsService } from 'angular2-notifications';
// import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

// @Component({
//   selector: 'app-list',
//   templateUrl: './list.component.html',
//   styleUrl: './list.component.css',
// })
// export class ListComponent implements OnInit, OnDestroy {
//   name = 'Angular 5';
//   options={
//       timeOut: 3000,
//       showProgressBar: true,
//       pauseOnHover: true,
//       clickToClose: true
//     };
// constructor( private _service: NotificationsService ) {
//       // Create 100 users
//     const users: UserData[] = [];
//     var users1=[];
//     for (let i = 1; i <= 100; i++) { /*users.push(createNewUser(i));*/
    
//       users1.push({"cnt" : i,"name":"batr"+i});
      
//      }

//     // Assign the data to the data source for the table to render
//     this.dataSource = new MatTableDataSource(users1);
// }
 
//    ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }

//   ngOnInit(){
//   this._service.success('nat','dndnnd',this.options);
// }

// displayedColumns = ['id', 'name', 'progress', 'color'];
//   dataSource: MatTableDataSource<UserData>;

//   @ViewChild(MatPaginator) paginator: MatPaginator;
//   @ViewChild(MatSort) sort: MatSort;

//    applyFilter(filterValue: string) {
//     filterValue = filterValue.trim(); // Remove whitespace
//     filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
//     this.dataSource.filter = filterValue;
//   }
 
//  addbut(){
//    window.alert("addbutton");
//  }
//  editbut(){
//    window.alert("editbutton");
//  }


// }


// /** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }

// /** Constants used to fill up our data base. */
// const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
//   'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
// const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
//   'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
//   'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   color: string;
// }
