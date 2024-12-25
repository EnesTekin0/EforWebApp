import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ProjectDto } from '../services/project-dto.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeProjectService } from '../services/employeeproject.service';
import { EmployeeProjectDto } from '../services/employeeproject-dto.model';
import { LoaderService } from '../services/loader.service';
import { JwtHelperService } from '../services/jwt-helper.service';

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
  employeeId: number | null = null;

  constructor(
    private projectService: ProjectService,
    private employeeProjectService: EmployeeProjectService,
    private router: Router,
    private loaderService: LoaderService,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.jwtHelper.getEmployeeId();
    if (this.employeeId !== null) {
      this.loadEmployeeProjects();
    } else {
      console.error('Employee ID not found');
    }
  }

  loadEmployeeProjects() {
    this.loaderService.show(); 
    this.employeeProjectSubscription = this.employeeProjectService
      .getEmployeeProjectsByEmployeeId(this.employeeId!)
      .subscribe(
        (data: EmployeeProjectDto[]) => {
          this.employeeProjects = data;
          console.log('Employee Projects:', this.employeeProjects);
          this.loadProjects(); 
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
        this.filterProjectsByEmployee(); 
        this.loaderService.hide(); 
      },
      (error) => {
        console.error('Error loading projects', error);
        // this.loaderService.hide(); // Hata durumunda loader'ı kapatıyoruz
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