import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ProjectDto } from '../services/project-dto.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeProjectService } from '../services/employeeproject.service';
import { EmployeeProjectDto } from '../services/employeeproject-dto.model';

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.css'],
})
export class MyProjectComponent implements OnInit, OnDestroy {
  projects: ProjectDto[] = [];
  employeeProjects: EmployeeProjectDto[] = [];
  filteredProjects: any[] = [];

  projectSubscription!: Subscription;
  employeeProjectSubscription!: Subscription;
  employeeId: number = 1; 

  constructor(
    private projectService: ProjectService,
    private employeeProjectService: EmployeeProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployeeProjects();
  }

  loadEmployeeProjects() {
    this.employeeProjectSubscription = this.employeeProjectService
      .getEmployeeProjectsByEmployeeId(this.employeeId)
      .subscribe(
        (data: EmployeeProjectDto[]) => {
          this.employeeProjects = data;
          console.log('Employee Projects:', this.employeeProjects);
          this.loadProjects(); // EmployeeProject'leri yüklendikten sonra projeleri yükleyelim
        },
        (error) => {
          console.error('Error loading employee projects', error);
        }
      );
  }

  loadProjects() {
    this.projectSubscription = this.projectService.getProject().subscribe(
      (data: ProjectDto[]) => {
        this.projects = data;
        console.log('Projects:', this.projects);
        this.filterProjectsByEmployee(); // Projeleri filtreleyelim
      },
      (error) => {
        console.error('Error loading projects', error);
      }
    );
  }

  filterProjectsByEmployee() {
    const employeeProjectIds = this.employeeProjects
      .map((ep) => ep.projectId)
      .filter((id): id is number => id !== undefined);
    this.filteredProjects = this.projects
      .filter((project) => employeeProjectIds.includes(project.projectId!))
      .map((project) => {
        const employeeProject = this.employeeProjects.find(
          (ep) => ep.projectId === project.projectId
        );
        return {
          ...project,
          employeeProjectId: employeeProject?.employeeProjectId,
          effortGoals: employeeProject?.effortGoals,
        };
      });
  }

  enterEffort(id: number | undefined) {
    const employeeProject = this.filteredProjects.find(
      (project) => project.projectId === id
    );
    if (employeeProject) {
      this.router.navigate(['/effort', employeeProject.employeeProjectId]);
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
    if (this.employeeProjectSubscription) {
      this.employeeProjectSubscription.unsubscribe();
    }
  }
}