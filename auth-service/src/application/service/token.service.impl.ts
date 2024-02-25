import {TokenService, UserInfo} from "../../core/domain/service/token/token.service";
import { sign, verify } from 'jsonwebtoken';
import {IntegrationException} from "../../core/exception/integration.exception";

export class TokenServiceImpl implements TokenService {
    private static instance: TokenServiceImpl;

    private constructor() {}

    private jwtsecretkey = process.env.JWT_SECRET_KEY;

    public static getInstance(): TokenService {
        if (!TokenServiceImpl.instance) {
            TokenServiceImpl.instance = new TokenServiceImpl();
        }
        return TokenServiceImpl.instance;
    }

    generateTokenByUserEmail(userInfo: UserInfo): string {
        return sign({
            id: userInfo.id,
            email: userInfo.email
        },
            this.validJwtSecretKey(),
            { expiresIn: '5h'})
    }

    verifyToken(token: string): boolean {
        try {
            token = this.RemoveBearerPrefix(token);
            verify(token, this.validJwtSecretKey());
            return true;
        } catch (error) {
            console.error("[TokenServiceImpl] - Token inválido: ", error);
            return false;
        }
    }

    private validJwtSecretKey(): string {
        if (!this.jwtsecretkey) {
            console.error("[TokenServiceImpl] - Chave secreta do JWT não configurada");
            throw new IntegrationException("Chave secreta do JWT não configurada");
        }
        return this.jwtsecretkey;
    }

    private RemoveBearerPrefix(token: string): string {
        return token.replace("Bearer ", "");
    }
}