import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import jwt_decode from "jwt-decode";
import {isPlatformBrowser} from "@angular/common";

export interface AccessToken {
  tokenType: string
  accessToken: string
}

export interface TokenPayload {
  sub: number
  exp: number
  iat: number
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  clearToken() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  hasAccess(): boolean {
    return this.getToken() != null;
  }

  getToken(): null | AccessToken {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    try {
      const tokenStringInfo = localStorage.getItem('token');

      if (!tokenStringInfo) {
        return null;
      }

      const tokenInfo: AccessToken = JSON.parse(tokenStringInfo)

      const tokenPayload: TokenPayload = jwt_decode(tokenInfo.accessToken);

      if (!tokenPayload.exp) {
        this.clearToken();
        return null;
      }

      const date = new Date(0);
      date.setUTCSeconds(tokenPayload.exp);

      const dateNow = new Date();

      if (dateNow >= date) {
        this.clearToken();
        return null;
      }

      return tokenInfo
    } catch (error) {
      this.clearToken();
      return null;
    }


  }
}
