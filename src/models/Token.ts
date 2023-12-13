export class TokenModel {
    accessToken: string | null = null; 
    refreshToken: string | null = null; 
}

export class TokenSlice {
    tokens: TokenModel = new TokenModel();
}