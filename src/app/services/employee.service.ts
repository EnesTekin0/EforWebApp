import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EmployeeDto } from './employee-dto.model';

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
  constructor(private http: HttpClient) {}

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
        localStorage.setItem('token', response.token);
      })
    );
  }
  logout() {
    localStorage.removeItem('token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
