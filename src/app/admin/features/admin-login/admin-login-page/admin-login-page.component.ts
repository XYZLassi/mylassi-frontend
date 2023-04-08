import {Component, inject} from '@angular/core';
import {IApiTokenRestType} from "../../../../../api";
import {Router} from "@angular/router";
import {UserAuthenticationService} from "../../../../shared/data-access";

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.scss']
})
export class AdminLoginPageComponent {

  private userService = inject(UserAuthenticationService);
  private router = inject(Router);

  onLogin(tokenInfo: IApiTokenRestType) {

    if (this.userService.setToken(tokenInfo)) {
      this.router.navigate(['admin']);
    }


  }
}
