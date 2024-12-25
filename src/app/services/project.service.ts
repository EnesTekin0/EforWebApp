import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectDto } from './project-dto.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:5173/api/Project'; 

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  getProject(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(this.apiUrl);
  }

  getProjectById(id: number): Observable<ProjectDto> { 
    return this.http.get<ProjectDto>(`${this.apiUrl}/${id}`); }




    postProject(ProjectDto: ProjectDto): Observable<ProjectDto> {
      return this.http.post<ProjectDto>(this.apiUrl, ProjectDto, this.httpOptions);
    }
  
    updateProject(id: number, ProjectDto: ProjectDto): Observable<ProjectDto> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.put<ProjectDto>(url, ProjectDto, this.httpOptions);
    }
    
  
    deleteProject(id: number): Observable<void> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<void>(url);
    }

}