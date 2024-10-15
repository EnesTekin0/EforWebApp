import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDto } from '../services/employee-dto.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: EmployeeDto[] = [];
  filterInactive = false;
  sortColumn: string = ''; // Hangi sütuna göre sıralanacağını takip eder
  sortDirection: string = 'asc'; // 'asc' veya 'desc'

  employeeSubscription!: Subscription;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

    // Tüm çalışanları yükleme
  loadEmployees() {
    this.employeeSubscription = this.employeeService.getEmployees().subscribe(
      (data: EmployeeDto[]) => {
        this.employees = data;
        this.sortEmployees(); // İlk yüklemede varsayılan sıralama yapılabilir
      },
      error => {
        console.error('Error loading employees', error);
      }
    );
  }

    // Sıralama işlemi
  sortEmployees() {
    let directionMultiplier = this.sortDirection === 'asc' ? 1 : -1;
  
    this.employees.sort((a, b) => {
    if (this.sortColumn === 'id') {
      // employeeId null veya undefined olabilir, bunu kontrol et
      const idA = a.employeeId || 0; // null/undefined durumunda 0 kabul et
      const idB = b.employeeId || 0;
      return (idA - idB) * directionMultiplier;
    } else if (this.sortColumn === 'firstName') {
      return a.firstName.localeCompare(b.firstName) * directionMultiplier;
    }
    return 0;
  });
}

      // Sütuna tıklandığında sıralama yönünü ve sütunu güncelle
  onSortColumn(column: string) {
    if (this.sortColumn === column) {
      // Aynı sütuna tekrar tıklanmışsa sıralama yönünü değiştir
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Farklı bir sütuna tıklanmışsa, bu yeni sütuna göre sıralama yap
      this.sortColumn = column;
      this.sortDirection = 'asc'; // Yeni sütuna göre sıralama yaparken artan sırada başla
    }
    this.sortEmployees(); // Sıralama işlemini tekrar yap
  }

  editEmployee(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['update', id]);
    }
  }
  
  deleteEmployee(id: number | undefined) {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.employeeSubscription = this.employeeService.deleteEmployee(id).subscribe(
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

    ngOnDestroy() {
      if(this.employeeSubscription) {
       this.employeeSubscription.unsubscribe();
      }
   }
  }