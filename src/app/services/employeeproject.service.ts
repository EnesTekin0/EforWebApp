import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeProjectDto } from './employeeproject-dto.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeProjectService {
  [x: string]: any;
  private apiUrl = 'http://localhost:5173/api/EmployeeProject';

  constructor(private http: HttpClient) {}

  getEmployeeProjects(): Observable<EmployeeProjectDto[]> {
    return this.http.get<EmployeeProjectDto[]>(this.apiUrl);
  }

  getEmployeeProjectById(
    employeeId: number,
    projectId: number
  ): Observable<EmployeeProjectDto> {
    return this.http.get<EmployeeProjectDto>(
      `${this.apiUrl}/${employeeId}/${projectId}`
    );
  }

  createEmployeeProject(
    employeeProject: EmployeeProjectDto
  ): Observable<EmployeeProjectDto> {
    return this.http.post<EmployeeProjectDto>(this.apiUrl, employeeProject);
  }

  updateEmployeeProject(employeeProject: EmployeeProjectDto): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${employeeProject.employeeId}/${employeeProject.projectId}`,
      employeeProject
    );
  }

  deleteEmployeeProject(
    employeeId: number,
    projectId: number
  ): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${employeeId}/${projectId}`);
  }

  getEffortGoalsByProjectId(
    employeeProjectId: number
  ): Observable<EmployeeProjectDto> {
    return this.http.get<EmployeeProjectDto>(
      `${this.apiUrl}${employeeProjectId}`
    );
  }

  getWeeklyEffort(employeeProjectId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${employeeProjectId}`);
  }

  getEmployeeProject(): Observable<EmployeeProjectDto[]> {
    return this.http.get<EmployeeProjectDto[]>(this.apiUrl);
  }

  getEffortAmountByProjectId(
    projectId: number
  ): Observable<EmployeeProjectDto> {
    return this.http.get<EmployeeProjectDto>(`${this.apiUrl}/${projectId}`);
  }

  createEffort(effort: EmployeeProjectDto): Observable<EmployeeProjectDto> {
    return this.http.post<EmployeeProjectDto>(this.apiUrl, effort);
  }

  getEmployeeProjectsByEmployeeId(
    employeeId: number
  ): Observable<EmployeeProjectDto[]> {
    return this.http.get<EmployeeProjectDto[]>(
      `${this.apiUrl}/by-employee/${employeeId}`
    );
  }
}
