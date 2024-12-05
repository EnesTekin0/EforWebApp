import { Component, inject } from '@angular/core';
import { ProjectDto } from '../services/project-dto.model';
import { FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
  providers: [
    provideMomentDateAdapter(),
  ],
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule,
     ReactiveFormsModule, MatInputModule, 
    MatButtonModule, MatCardModule, CommonModule,
     MatCheckboxModule, FormsModule, MatRadioModule, MatDividerModule, MatIconModule, FormsModule],

})
export class ProjectComponent {
  
  
  projectForm: FormGroup;
  readonly date = new FormControl(moment([2017, 0, 1]));
  createSuccess: boolean = false;
  updateSuccess: boolean = false;
  createError: boolean = false;
  projectSubscription!: Subscription
  isEditMode: boolean = false;
  id: number | null = null;
  private _snackBar = inject(MatSnackBar);

  message: string = 'Proje oluşturuldu';



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder 
  ) { 
    this.projectForm = this.fb.group({
      projectName: [''],
      startDate: [new Date()],
      endDate: [new Date()],
      activeprojects: [true],
    });
  }


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = +id;
      this.isEditMode = true;
      this.loadProject(this.id);
    }
  }


  loadProject(id: number) {
    this.projectSubscription = this.projectService.getProjectById(id).subscribe(
      (project: ProjectDto) => {
        this.projectForm.patchValue(project); 
      },
      error => {
        console.error('Error loading project', error);
      }
    );
  }

  submitProject() {
    if (this.isEditMode && this.id) {
      this.updateProject(this.id);
    } else {
      this.createProject();
    }
  }


  createProject() {
    this.projectSubscription = this.projectService.postProject(this.projectForm.value).subscribe(
      response => {
        console.log('project created successfully', response);


        this.createSuccess = true;

        setTimeout(() => {
          this.createSuccess = false;
          this.router.navigate(['allproject']);
        }, 700);

      },
      error => {
        console.error('Error creating project', error);
        this.createError = true;

        setTimeout(() => {
          this.createError = false;
          this.router.navigate(['project']);
        }, 6000);
      }
    );
  }

  updateProject(id: number) {
    this.projectSubscription = this.projectService.updateProject(id, this.projectForm.value).subscribe(
      response => {
        console.log('project updated successfully', response);

        this.updateSuccess = true;

        setTimeout(() => {
          this.updateSuccess = false;
          this.router.navigate(['allproject']);
        }, 1000);
      },
      error => {
        console.error('Error updating project', error);
      }
    );
  }

  ngOnDestroy() {
    ""
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
  }



}
