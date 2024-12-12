import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private loaderSubscription!: Subscription;
  private routerSubscription!: Subscription;

  constructor(private loaderService: LoaderService, private router: Router) {}

  ngOnInit() {
    this.loaderSubscription = this.loaderService.getLoaderState().subscribe((state: boolean) => {
      this.isLoading = state;
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

  ngOnDestroy() {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
