import {TokenService} from "../../service/token/token.service";
import {AuthenticationException} from "../../../exception/authentication.exception";

export class VerifyTokenUseCase {
    private static instance: VerifyTokenUseCase;

    private tokenService: TokenService;

    private constructor(
        tokenService: TokenService
    ) {
        this.tokenService = tokenService;
    }

    public static getInstance(
        tokenService: TokenService
    ): VerifyTokenUseCase {
        if (!VerifyTokenUseCase.instance) {
            VerifyTokenUseCase.instance =
                new VerifyTokenUseCase(
                    tokenService
                );
        }
        return VerifyTokenUseCase.instance;
    }

    async execute(token: string): Promise<boolean> {
        try {
            console.log("[AuthController] - Iniciando verificação de token")
            return this.tokenService.verifyToken(token);
        }
        catch (error: any) {
            throw this.exceptionHandler(error);
        }
    }

    private exceptionHandler(error: any) {
        console.error("[VerifyTokenUseCase] - Erro ao verificar token: ", error);
        throw new AuthenticationException("Erro ao verificar token");
    }
}