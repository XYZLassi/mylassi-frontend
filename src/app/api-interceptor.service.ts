import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import jwt_decode from "jwt-decode";
import {UserAuthenticationService} from "./services/user-authentication.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private _authenticationService: UserAuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._authenticationService.getToken()


    // Todo: Dynamic Url
    if (token && (request.url.startsWith('https://api.mylassi.xyz') || request.url.startsWith('https://mylassi.xyz'))) {
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
