import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import jwt_decode from "jwt-decode";
import {isPlatformBrowser} from "@angular/common";
import {SecurityService} from "../api/services/security.service";
import {TokenRestType} from "../api/models/token-rest-type";
import {tap} from "rxjs/operators";

export interface AccessToken {
  tokenType: string
  accessToken: string
}

export interface TokenPayload {
  sub: number
  exp: number
  iat: number
}

const TOKEN_STORAGE_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private securityServer: SecurityService) {
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
      const tokenStringInfo = localStorage.getItem(TOKEN_STORAGE_KEY);

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

  login(username: string, password: string, expireTime?: number) {
    return this.securityServer.createNewToken({
      body: {
        username: username,
        password: password
      },
      expire_time: expireTime,
    }).pipe(
      tap(token => {
        this.setToken(token);
      })
    );
  }

  setToken(token: TokenRestType) {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
  }

  getNewToken(expireTime?: number) {
    return this.securityServer.refreshToken({
      expire_time: expireTime
    })
  }

  refreshToken(expireTime?: number) {
    return this.getNewToken(expireTime).pipe(
      tap(token => {
        this.setToken(token);
      })
    )
  }
}
