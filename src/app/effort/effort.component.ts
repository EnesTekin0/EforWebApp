import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { ProjectDto } from '../services/project-dto.model';
import { EmployeeProjectService } from '../services/employeeproject.service';
import { EmployeeProjectDto } from '../services/employeeproject-dto.model';
import { EffortDto } from '../services/effort-dto.model';
import { EffortService } from '../services/effort.service';

@Component({
  selector: 'app-effort',
  templateUrl: './effort.component.html',
  styleUrls: ['./effort.component.css']
})
export class EffortComponent implements OnInit {
  projectId: number | null = null;
  employeeProjectId: number | null = null;
  projectName: string = '';
  // effortGoals: number = 0;
  effortAmount: number = 0;
  // weeklyEffort: any = {
  //   monday: 0,
  //   tuesday: 0,
  //   wednesday: 0,
  //   thursday: 0,
  //   friday: 0,
  //   saturday: 0,
  //   sunday: 0
  // };
  effortForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private effortService: EffortService,
    private employeeProjectService: EmployeeProjectService,
    private fb: FormBuilder
  ) {
    this.effortForm = this.fb.group({
      effortAmount: ['', Validators.required],
      effortDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      if (this.projectId !== null) {
        this.loadProjectDetails(this.projectId);
      }
    });
  }

  loadProjectDetails(projectId: number): void {
    if (projectId !== null) {
    this.projectService.getProjectById(projectId).subscribe((project: ProjectDto) => {
      this.projectName = project.projectName;

      this.loadEffortAmount(projectId);
    });
    }
  }



  loadEffortAmount(projectId: number): void {
    if (projectId !== null) {
    this.employeeProjectService.getEffortAmountByProjectId(projectId).subscribe((employeeProject: EmployeeProjectDto) => {
      this.projectId = employeeProject.projectId;
    });
  }
  }


  onSubmit(): void {
    if (this.effortForm.valid && this.projectId !== null) {
      const effortData: EmployeeProjectDto = {
        ...this.effortForm.value,
        ProjectId: this.projectId!,
      };
      this.employeeProjectService.createEffort(effortData).subscribe(response => {
        console.log('Efor başarıyla kaydedildi.', response);
        this.loadEffortAmount(this.projectId!); 
      }, error => {
        console.error('Efor kaydedilirken hata oluştu.', error);
      });
    }
  }
}

//   onSubmit(): void {
//     if (this.effortForm.valid && this.projectId !== null) {
//       const effortData: EmployeeProjectDto = {
//         ...this.effortForm.value,
//         projectId: this.projectId,
//         employeeId: 0,
//         effortGoals: this.effortGoals,
//         startDate: new Date(),
//         endDate: new Date(),
//       };
//       this.employeeProjectService.createEmployeeProject(effortData).subscribe(
//         (response) => {
//           console.log('Efor başarıyla kaydedildi.', response);
//           this.loadEffortAmount(this.projectId);
//         },
//         (error) => {
//           console.error('Efor kaydedilirken hata oluştu.', error);
//         }
//       );
//     }
//   }
// }






// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ProjectService } from '../services/project.service';
// import { ProjectDto } from '../services/project-dto.model';
// import { EmployeeProjectService } from '../services/employeeproject.service';
// import { EmployeeProjectDto } from '../services/employeeproject-dto.model';
// import { EffortDto } from '../services/effort-dto.model';
// import { EffortService } from '../services/effort.service';

// @Component({
//   selector: 'app-effort',
//   templateUrl: './effort.component.html',
//   styleUrls: ['./effort.component.css'],
// })
// export class EffortComponent implements OnInit {
//   [x: string]: any;
//   projectId!: number;
//   projectName: string = '';
//   effortGoals: number = 0;
//   effortAmount: any = {
//     monday: 0,
//     tuesday: 0,
//     wednesday: 0,
//     thursday: 0,
//     friday: 0,
//     saturday: 0,
//     sunday: 0,
//   };
//   effortForm: FormGroup;

//   constructor(
//     private route: ActivatedRoute,
//     private projectService: ProjectService,
//     private effortService: EffortService,
//     private employeeProjectService: EmployeeProjectService,
//     private fb: FormBuilder
//   ) {
//     this.effortForm = this.fb.group({
//       effortAmount: ['', Validators.required],
//       effortDate: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       this.projectId = +params['id'];
//       this.loadProjectDetails(this.projectId);
//     });
//   }

//   loadProjectDetails(projectId: number): void {
//     this.projectService
//       .getProjectById(projectId)
//       .subscribe((project: ProjectDto) => {
//         this.projectName = project.projectName;
//         this.loadEffortAmount(projectId);
//       });
//   }

//   loadEffortGoals(projectId: number): void {
//     this.employeeProjectService
//       .getEffortGoalsByProjectId(projectId)
//       .subscribe((effort: EmployeeProjectDto) => {
//         this.effortGoals = effort.effortAmount;
//         this.getEffortAmount(projectId);
//       });
//   }

//   loadEffortAmount(projectId: number): void {
//     this.employeeProjectService
//       .getEffortAmount(projectId)
//       .subscribe((effort: any) => {
//         this.effortAmount = effort;
//       });
//   }

//   onSubmit(): void {
//     if (this.effortForm.valid && this.projectId !== null) {
//       const effortData: EmployeeProjectDto = {
//         ...this.effortForm.value,
//         projectId: this.projectId,
//         employeeId: 0,
//         effortGoals: this.effortGoals,
//         startDate: new Date(),
//         endDate: new Date(),
//       };
//       this.employeeProjectService.createEmployeeProject(effortData).subscribe(
//         (response) => {
//           console.log('Efor başarıyla kaydedildi.', response);
//           this.loadEffortAmount(this.projectId);
//         },
//         (error) => {
//           console.error('Efor kaydedilirken hata oluştu.', error);
//         }
//       );
//     }
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Effort, EffortDto } from '../services/effort-dto.model';
// import { EffortService } from '../services/effort.service';

// import { EmployeeProjectService } from '../services/employeeproject.service';
// import { EmployeeProjectDto } from '../services/employeeproject-dto.model';

// @Component({
//   selector: 'app-effort',
//   templateUrl: './effort.component.html',
//   styleUrl: './effort.component.css'
// })

// export class EffortComponent implements OnInit{
//   efforts: Effort[] = [];
//   newEffort: EffortDto = { employeeProjectId: 0, effortDate: new Date(), monthlyEffort: 0 };
//   selectedDay: number | null = null;
//   daysInMonth: number[] = [];

//   constructor(private effortService: EffortService) {}

//   ngOnInit(): void {
//     this.getEfforts();
//     this.generateDaysInMonth();
//   }

//   generateDaysInMonth(): void {
//     const date = new Date();
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     this.daysInMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);
//   }

//   selectDay(day: number): void {
//     this.selectedDay = day;
//     const currentDate = new Date();
//     this.newEffort.effortDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
//   }

//   getEfforts(): void {
//     this.effortService.getEfforts().subscribe((data) => (this.efforts = data));
//   }

//   submitEffort(): void {
//     this.effortService.addEffort(this.newEffort).subscribe((addedEffort) => {
//       this.efforts.push(addedEffort);
//       this.newEffort = { employeeProjectId: 0, effortDate: new Date(), monthlyEffort: 0 };
//       this.selectedDay = null;
//     });
//   }

//   deleteEffort(id: number): void {
//     this.effortService.deleteEffort(id).subscribe(() => {
//       this.efforts = this.efforts.filter((effort) => effort.effortId !== id);
//     });
//   }

// }

// employeeProjects: EmployeeProjectDto[] = []; constructor(private employeeProjectService: EmployeeProjectService) { }

// ngOnInit(): void {
//    this.loadEmployeeProjects();
//   }
//   loadEmployeeProjects(): void {
//     this.employeeProjectService.getEmployeeProjects().subscribe(data => { this.employeeProjects = data; }); }
