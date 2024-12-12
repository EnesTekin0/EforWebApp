import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { withFetch } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeeComponent } from './employee/employee.component';
import { RegisterComponent } from './register/register.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EffortComponent } from './effort/effort.component';
import { MyProjectComponent } from './my-project/my-project.component';
import { AllProjectComponent } from './all-project/all-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ProjectComponent } from './project/project.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './services/loader.interceptor';
import { LoaderService } from './services/loader.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; 


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    EmployeeComponent,
    ConfirmDialogComponent,
    EffortComponent,
    MyProjectComponent,
    AllProjectComponent,
    ProjectDetailsComponent,
    LoaderComponent,
  ],
  imports: [
    MatToolbarModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RegisterComponent,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    HeaderComponent,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    ProjectComponent,
    MatSidenavModule,
    MatListModule,
  ],

  providers: [
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    LoaderService,
    provideHttpClient(withInterceptorsFromDi()) 
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
