import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EffortDto } from '../services/effort-dto.model';
import { Effort } from '../services/effort-dto.model';

@Injectable({
  providedIn: 'root',
})
export class EffortService {
  private apiUrl = 'http://localhost:5173/api/Effort';

  constructor(private http: HttpClient) {}

  getEfforts(): Observable<Effort[]> {
    return this.http.get<Effort[]>(this.apiUrl);
  }

  getEffort(id: number): Observable<Effort> {
    return this.http.get<Effort>(`${this.apiUrl}/${id}`);
  }

  addEffort(effortDto: EffortDto): Observable<Effort> {
    return this.http.post<Effort>(this.apiUrl, effortDto);
  }

  updateEffort(id: number, effortDto: EffortDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, effortDto);
  }

  deleteEffort(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  // getEffortAmountByProjectId(employeeProjectId: number): Observable<EffortDto> {
  //   return this.http.get<EffortDto>(`${this.apiUrl}${employeeProjectId}`);
  // }
  createEffort(effort: EffortDto): Observable<EffortDto> {
    return this.http.post<EffortDto>(this.apiUrl, effort);
  }
}
