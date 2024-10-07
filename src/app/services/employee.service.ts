import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeDto } from './employee-dto.model';  // EmployeeDto modelini import et

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:5173/api/Employee';  // API URL

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // GET: Tüm çalışanları listelemek için
  getEmployees(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(this.apiUrl);
  }

  // GET: Belirli bir çalışanı ID ile almak için
  getEmployeeById(id: number): Observable<EmployeeDto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<EmployeeDto>(url);
  }

  // POST: Yeni bir çalışan eklemek için
  postEmployee(employeeDto: EmployeeDto): Observable<EmployeeDto> {
    return this.http.post<EmployeeDto>(this.apiUrl, employeeDto, this.httpOptions);
  }

  // PUT: Mevcut bir çalışanı güncellemek için
  updateEmployee(id: number, employeeDto: EmployeeDto): Observable<EmployeeDto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<EmployeeDto>(url, employeeDto, this.httpOptions);
  }
  
  // DELETE: Bir çalışanı silmek için
  deleteEmployee(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}