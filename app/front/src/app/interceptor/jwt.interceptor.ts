import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {PersistenceService} from '../service/persistence.service';
import {AuthService} from '../service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  static readonly BACKEND_API_URL = environment.backend.baseUrl;

  private isRefreshing = false;

  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private persistenceService: PersistenceService,
              private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.persistenceService.get('token');
    const requestUrl = req.url;

    if (jwtToken && requestUrl.startsWith(JwtInterceptor.BACKEND_API_URL)) {
      req = this.addTokenHeader(req, jwtToken);
    }

    return next.handle(req)
      .pipe(catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.handle401Error(req, next);
        }
        return throwError(err);
      }));
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.persistenceService.get('refreshToken');

      if (refreshToken) {
        return this.authService.refreshToken(refreshToken)
          .pipe(
            switchMap((authResponse) => {
              this.isRefreshing = false;
              this.persistenceService.write(authResponse);
              this.refreshTokenSubject.next(authResponse.refreshToken);

              return next.handle(this.addTokenHeader(request, authResponse.token));
            }),
            catchError(err => {
              this.isRefreshing = false;
              this.refreshTokenSubject.next(null);
              return throwError(err);
            })
          );
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(token => next.handle(this.addTokenHeader(request, token)))
    );
  }


  addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
