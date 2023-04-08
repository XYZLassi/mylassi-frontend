import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserAuthenticationService} from "../../../shared/data-access";

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationGuard implements CanActivate {
  private router = inject(Router);
  private userService = inject(UserAuthenticationService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.userService.hasValidToken()) {
      this.router.navigate(['admin', 'login']);
      return false;
    }

    return true;
  }

}
