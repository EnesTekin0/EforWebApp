import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EffortComponent } from './effort/effort.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path:'header', component:HeaderComponent },
  { path:'footer', component:FooterComponent  },
  { path:'list', component:ListComponent },
  { path:'register', component:RegisterComponent  },
  { path:'create', component:RegisterComponent },
  { path:'update/:id', component:RegisterComponent },
  { path:'confirm-dialog', component:ConfirmDialogComponent },
  {path:'effort', component:EffortComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
