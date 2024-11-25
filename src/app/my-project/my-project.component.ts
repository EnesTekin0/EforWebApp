import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ProjectDto } from '../services/project-dto.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { EmployeeProjectService } from '../services/employeeproject.service';
import { EmployeeProjectDto } from '../services/employeeproject-dto.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.css']
})
export class MyProjectComponent implements OnInit, OnDestroy {

  project: ProjectDto[] = [];
  employeeProject: EmployeeProjectDto[] = [];

  employeeProjectId: number | null = null;

  projectSubscription!: Subscription;
  employee: any;

  constructor(
    private projectService: ProjectService,
    private employeeprojectService: EmployeeProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProjects();
    // this.loadEmployeeProjects();
  }

  loadProjects() {
    this.projectSubscription = this.projectService.getProject().subscribe(
      (data: ProjectDto[]) => {
        this.project = data;
      },
      error => {
        console.error('Error loading projects', error);
      }
    );
  }

  // loadEmployeeProjects() {
  //   this.projectSubscription = this.employeeprojectService.getEmployeeProject().subscribe(
  //     (data: EmployeeProjectDto[]) => {
  //       this.employeeProject = data;
  //     },
  //     error => {
  //       console.error('Error loading projects', error);
  //     }
  //   );
  // }

  enterEffort(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/effort', id]);
    }
  }

  viewDetails(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['projectdetails', id]);
    }
  }

  ngOnDestroy() {
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
  }
}
