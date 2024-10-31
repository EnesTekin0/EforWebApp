export interface EmployeeDto {
    employeeId?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    groups?: string[];
    hireDate?: Date;
    inactiveEmployees: boolean;
  }
  