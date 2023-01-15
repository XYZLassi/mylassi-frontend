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

  constructor(private _authenticationService : UserAuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._authenticationService.getToken()

    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `${token.token_type} ${token.access_token}`
        }
      });
    }

    // Also handle errors globally
    return next.handle(request).pipe(
      tap(x => x, err => {
        // Handle this err
        console.error(`Error performing request, status code = ${err.status}`);
      })
    );
  }
}
