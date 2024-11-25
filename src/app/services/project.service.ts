import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectDto } from './project-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:5173/api/Project'; 

  constructor(private http: HttpClient) { }

  getProject(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(this.apiUrl);
  }

  getProjectById(id: number): Observable<ProjectDto> { 
    return this.http.get<ProjectDto>(`${this.apiUrl}/${id}`); }
}
