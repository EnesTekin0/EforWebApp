import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ProjectDto } from '../services/project-dto.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  project: ProjectDto | undefined;
  private routeSubscription!: Subscription;
  private projectSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const projectId = Number(params.get('id'));
      this.loadProjectDetails(projectId);
    });
  }

  loadProjectDetails(id: number) {
    this.projectSubscription = this.projectService.getProjectById(id).subscribe(
      (data: ProjectDto) => {
        this.project = data;
      },
      error => {
        console.error('Error loading project details', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
  }
}
