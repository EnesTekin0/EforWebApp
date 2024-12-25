import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EmployeeDto } from './employee-dto.model';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5173/api/Employee';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Platform kontrolü için eklendi
  ) {}

  getEmployee(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<EmployeeDto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<EmployeeDto>(url);
  }

  postEmployee(employeeDto: EmployeeDto): Observable<EmployeeDto> {
    return this.http.post<EmployeeDto>(
      this.apiUrl,
      employeeDto,
      this.httpOptions
    );
  }

  updateEmployee(
    id: number,
    employeeDto: EmployeeDto
  ): Observable<EmployeeDto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<EmployeeDto>(url, employeeDto, this.httpOptions);
  }

  deleteEmployee(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<any>(url, { email, password }, this.httpOptions).pipe(
      tap((response) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      
      this.router.navigate(['register']);
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }
}
