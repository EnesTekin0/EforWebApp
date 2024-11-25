import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { ProjectDto } from '../services/project-dto.model';
import { Router } from '@angular/router';

// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';
// import {MatTableModule} from '@angular/material/table';
// import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-all-project',
  templateUrl: './all-project.component.html',
  styleUrls: ['./all-project.component.css'],
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed,void', style({height: '0px', minHeight: '0'})),
  //     state('expanded', style({height: '*'})),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ],
  // standalone: true,
  // imports: [MatTableModule, MatButtonModule, MatIconModule],
})
export class AllProjectComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['projectName', 'startDate', 'endDate', 'ActiveProjects', 'actions'];
  dataSource = new MatTableDataSource<ProjectDto>();

  projectSubscription!: Subscription;
// expandedElement: any;
// columnsToDisplayWithExpand: any;

  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  // columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  // expandedElement: PeriodicElement | null | undefined;

  
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

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//   description: string;
// }
