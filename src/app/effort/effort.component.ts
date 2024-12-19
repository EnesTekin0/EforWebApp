import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeProjectService } from '../services/employeeproject.service';
import { EffortService } from '../services/effort.service';
import { EffortDto } from '../services/effort-dto.model';
import { ProjectDto } from '../services/project-dto.model';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-effort',
  templateUrl: './effort.component.html',
  styleUrls: ['./effort.component.css'],
})
export class EffortComponent implements OnInit, OnDestroy {
  employeeProjectId: number | null = null;
  effortForm: FormGroup;
  projectService: any;
  projectName: string = '';
  project: ProjectDto | undefined;
  routeSubscription!: Subscription;
  effortSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private effortService: EffortService,
    private router: Router
  ) {
    this.effortForm = this.fb.group({
      effortAmount: ['', Validators.required],
      effortDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.employeeProjectId = +params['id'];
    });
  }

  onSubmit(): void {
    if (this.effortForm.valid && this.employeeProjectId !== null) {
      const effortData: EffortDto = {
        ...this.effortForm.value,
        employeeProjectId: this.employeeProjectId,
        effortId: 0,
      };
      this.effortSubscription = this.effortService
        .createEffort(effortData)
        .subscribe(
          (response) => {
            console.log('Efor başarıyla kaydedildi.', response);
            this.router.navigate(['/myproject']);
          },
          (error) => {
            console.error('Efor kaydedilirken hata oluştu.', error);
          }
        );
    }
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.effortSubscription) {
      this.effortSubscription.unsubscribe();
    }
  }
}
