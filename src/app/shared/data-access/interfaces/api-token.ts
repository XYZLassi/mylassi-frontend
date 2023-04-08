export interface ApiToken {
  tokenType: string
  accessToken: string
}

export interface TokenPayload {
  sub: number
  exp: number
  iat: number
}
