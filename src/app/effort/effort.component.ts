import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Effort, EffortDto } from '../services/effort-dto.model';
import { EffortService } from '../services/effort.service';





@Component({
  selector: 'app-effort',
  templateUrl: './effort.component.html',
  styleUrl: './effort.component.css'
})



export class EffortComponent implements OnInit{
  efforts: Effort[] = [];
  newEffort: EffortDto = { employeeProjectId: 0, effortDate: new Date(), monthlyEffort: 0 };
  selectedDay: number | null = null;
  daysInMonth: number[] = [];

  constructor(private effortService: EffortService) {}

  ngOnInit(): void {
    this.getEfforts();
    this.generateDaysInMonth();
  }

  
  generateDaysInMonth(): void {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  
  selectDay(day: number): void {
    this.selectedDay = day;
    const currentDate = new Date();
    this.newEffort.effortDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  }

  
  getEfforts(): void {
    this.effortService.getEfforts().subscribe((data) => (this.efforts = data));
  }

 
  submitEffort(): void {
    this.effortService.addEffort(this.newEffort).subscribe((addedEffort) => {
      this.efforts.push(addedEffort);
      this.newEffort = { employeeProjectId: 0, effortDate: new Date(), monthlyEffort: 0 };
      this.selectedDay = null;
    });
  }

  
  deleteEffort(id: number): void {
    this.effortService.deleteEffort(id).subscribe(() => {
      this.efforts = this.efforts.filter((effort) => effort.effortId !== id);
    });
  }

}
