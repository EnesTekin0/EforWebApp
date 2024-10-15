import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeFormComponent } from './EmployeeFormComponent/employee-form.component';
import { EmployeeListComponent } from './EmployeeListComponent/employee-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path:'create', component:EmployeeFormComponent },
  { path:'update/:id', component:EmployeeFormComponent },
  { path: '**', component: EmployeeListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }