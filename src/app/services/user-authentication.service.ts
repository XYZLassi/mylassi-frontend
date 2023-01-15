import {Injectable} from '@angular/core';
import jwt_decode from "jwt-decode";

export interface AccessToken {
  token_type: string
  access_token: string
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

  constructor() {
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  hasAccess(): boolean{
    return this.getToken() != null;
  }

  getToken(): null | AccessToken {
    const tokenStringInfo = localStorage.getItem('token');

    if (!tokenStringInfo) {
      return null;
    }

    const tokenInfo: AccessToken = JSON.parse(tokenStringInfo)

    const tokenPayload: TokenPayload = jwt_decode(tokenInfo.access_token);

    if (!tokenPayload.exp) {
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
  }
}
