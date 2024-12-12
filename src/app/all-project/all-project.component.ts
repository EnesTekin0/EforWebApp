import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { ProjectDto } from '../services/project-dto.model';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service'; 

@Component({
  selector: 'app-all-project',
  templateUrl: './all-project.component.html',
  styleUrls: ['./all-project.component.css'],
})
export class AllProjectComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['projectName', 'startDate', 'endDate', 'ActiveProjects', 'actions'];
  dataSource = new MatTableDataSource<ProjectDto>();

  projectSubscription!: Subscription;
  
  constructor(private projectService: ProjectService, private router: Router, private loaderService: LoaderService ) {}

  ngOnInit(): void {
    this.loadProject();
  }

  loadProject() {
    this.loaderService.show(); // Loader'ı gösteriyoruz
    this.projectSubscription = this.projectService.getProject().subscribe(
      (data: ProjectDto[]) => {
        this.dataSource.data = data;
        this.loaderService.hide(); // Başarı durumunda loader'ı gizliyoruz
      },
      error => {
        console.error('Error loading projects', error);
        // this.loaderService.hide(); // Hata durumunda loader'ı kapatıyoruz 
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
