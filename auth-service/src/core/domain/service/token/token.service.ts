export interface TokenService {
    generateTokenByUserEmail(userInfo: UserInfo): string;
    verifyToken(token: string): boolean;
}

export interface UserInfo {
    id: string;
    email: string;
}