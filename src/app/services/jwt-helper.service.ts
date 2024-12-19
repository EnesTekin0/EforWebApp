import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtHelperService {
  constructor() {}

  decodeToken(token: string): any {
    if (!token) return null;
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    const payload = parts[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }

  getEmployeeId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedToken = this.decodeToken(token);
    return decodedToken ? +decodedToken.employeeId : null;
  }
}
