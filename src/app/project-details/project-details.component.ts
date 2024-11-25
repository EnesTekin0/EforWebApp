import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ProjectDto } from '../services/project-dto.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  project: ProjectDto | undefined;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectId = Number(params.get('id'));
      this.loadProjectDetails(projectId);
    });
  }

  loadProjectDetails(id: number) {
    this.projectService.getProjectById(id).subscribe(
      (data: ProjectDto) => {
        this.project = data;
      },
      error => {
        console.error('Error loading project details', error);
      }
    );
  }
}

