import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { Subscription } from 'rxjs';
import { EmployeeService } from './services/employee.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title='effort'

  isVisible: boolean = false;
  isLoading: boolean = false;
  private loaderSubscription!: Subscription;
  private routerSubscription!: Subscription;

  constructor(private loaderService: LoaderService, private cdRef: ChangeDetectorRef,private router: Router, public employeeService:EmployeeService ) {}

  ngOnInit() {
    this.loaderSubscription = this.loaderService.getLoaderState().subscribe((state: boolean) => {
      this.isLoading = state;
      this.isVisible = true;
    });

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const excludedRoutes = ['/register', '/project'];

        if (!excludedRoutes.some(route => event.url.startsWith(route))) {
          this.loaderService.show();
        }
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loaderService.hide();
      }
    });
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges(); // Manuel olarak değişim tespiti tetikleyin
  }

  ngOnDestroy() {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}