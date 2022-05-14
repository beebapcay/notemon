import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersistenceService } from '../service/persistence.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  static readonly BACKEND_API_URL = environment.backend.baseUrl;

  constructor(private persistenceService: PersistenceService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.persistenceService.get('token');
    const requestUrl = req.url;

    if (jwtToken && requestUrl.startsWith(JwtInterceptor.BACKEND_API_URL)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
    }

    return next.handle(req);
  }
}
