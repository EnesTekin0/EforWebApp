import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from './loader.service';

describe('LoaderInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoaderService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    loaderService = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    const interceptor = TestBed.inject(HTTP_INTERCEPTORS);
    expect(interceptor).toBeTruthy();
  });

  it('should show loader on HTTP request and hide on response', () => {
    spyOn(loaderService, 'show').and.callThrough();
    spyOn(loaderService, 'hide').and.callThrough();

    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(loaderService.show).toHaveBeenCalled();

    req.flush({});
    expect(loaderService.hide).toHaveBeenCalled();
  });

  afterEach(() => {
    httpMock.verify();
  });
});

