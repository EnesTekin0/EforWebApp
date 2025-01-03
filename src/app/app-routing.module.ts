import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeeComponent } from './employee/employee.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EffortComponent } from './effort/effort.component';
import { MyProjectComponent } from './my-project/my-project.component';
import { AllProjectComponent } from './all-project/all-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path:'header', component:HeaderComponent },
  { path:'footer', component:FooterComponent  },
  { path:'employee', component:EmployeeComponent },
  { path:'register', component:RegisterComponent  },
  { path:'create', component:RegisterComponent },
  { path:'employeeupdate/:id', component:RegisterComponent },
  { path:'projectupdate/:id', component:ProjectComponent },
  { path:'confirm-dialog', component:ConfirmDialogComponent },
  { path:'effort/:id', component:EffortComponent },
  { path:'myproject', component:MyProjectComponent },
  { path:'allproject', component:AllProjectComponent },
  { path:'projectdetails/:id', component:ProjectDetailsComponent },
  { path:'project', component:ProjectComponent },
  { path:'login', component: LoginComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }