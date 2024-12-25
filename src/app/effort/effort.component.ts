import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeProjectService } from '../services/employeeproject.service';
import { EffortService } from '../services/effort.service';
import { EffortDto } from '../services/effort-dto.model';
import { ProjectDto } from '../services/project-dto.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { NgModule } from '@angular/core'; // Eğer native tarih adaptörü kullanıyorsanız
import { MatMomentDateModule } from '@angular/material-moment-adapter'; // Eğer moment.js kullanıyorsanız
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-effort',
  templateUrl: './effort.component.html',
  styleUrls: ['./effort.component.css'],
    standalone: true,
    imports: [MatFormFieldModule, MatDatepickerModule,MatDatepickerModule,
       ReactiveFormsModule, MatInputModule, MatStepperModule,
      MatButtonModule, MatCardModule, CommonModule,
       MatCheckboxModule, FormsModule, MatRadioModule
       , MatDividerModule, MatIconModule, FormsModule,MatDatepickerModule,
       MatNativeDateModule, // Native tarih adaptörü için
       MatMomentDateModule, ]
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
