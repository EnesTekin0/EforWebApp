import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { ProjectDto } from '../services/project-dto.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-project',
  templateUrl: './all-project.component.html',
  styleUrls: ['./all-project.component.css'],
})
export class AllProjectComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['projectName', 'startDate', 'endDate', 'ActiveProjects', 'actions'];
  dataSource = new MatTableDataSource<ProjectDto>();

  projectSubscription!: Subscription;
  
  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProject();
  }

  loadProject() {
    this.projectSubscription = this.projectService.getProject().subscribe(
      (data: ProjectDto[]) => {
        this.dataSource.data = data;
      },
      error => {
        console.error('Error loading projects', error);
      }
    );
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
