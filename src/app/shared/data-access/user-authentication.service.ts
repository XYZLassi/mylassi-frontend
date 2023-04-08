import {Injectable} from '@angular/core';
import {ApiToken, TokenPayload} from "./interfaces/api-token";
import jwt_decode from "jwt-decode";

const TOKEN_SAVE_NAME = 'ApiToken'

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  setToken(tokenInfo: ApiToken) {
    if (!this.testToken(tokenInfo))
      return false;

    const token = JSON.stringify(tokenInfo);
    localStorage.setItem(TOKEN_SAVE_NAME, token);

    return true;
  }

  clearToken() {
    localStorage.removeItem(TOKEN_SAVE_NAME);
  }

  getToken(): ApiToken | null {
    const token = localStorage.getItem(TOKEN_SAVE_NAME);
    if (!token)
      return null

    try {
      const tokenInfo = JSON.parse(token);

      if (!this.testToken(tokenInfo)) {
        this.clearToken();
        return null
      }

      return tokenInfo;

    } catch {
      this.clearToken()
    }

    return null;
  }

  testToken(tokenInfo: ApiToken) {
    const tokenPayload: TokenPayload = jwt_decode(tokenInfo.accessToken);

    const date = new Date(0);
    date.setUTCSeconds(tokenPayload.exp);

    const dateNow = new Date();

    return !(dateNow >= date)

  }

  hasValidToken() {
    const tokenInfo = this.getToken();

    return !(!tokenInfo || !this.testToken(tokenInfo));


  }
}
