import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserAuthenticationService} from "./user-authentication.service";
import {tap} from "rxjs/operators";

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {

  private userAuthenticationService = inject(UserAuthenticationService);

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.userAuthenticationService.getToken();


    // Todo: Dynamic Url
    if (token && (request.url.startsWith('/api'))) {
      request = request.clone({
        setHeaders: {
          'Authorization': `${token.tokenType} ${token.accessToken}`
        }
      });
    }

    // Also handle _errors globally
    return next.handle(request).pipe(
      tap(x => x, err => {
        // Handle this err
        console.error(`Error performing request, status code = ${err.status}`);
      })
    );
  }
}
