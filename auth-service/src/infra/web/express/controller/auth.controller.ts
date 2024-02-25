import {LoginWithUserEmailUsecase} from "../../../../core/domain/usecases/login/login.with.email.usecase";
import {VerifyTokenUseCase} from "../../../../core/domain/usecases/verif-token/verify.token.use.case";
import {GlobalExceptionHandler} from "../middleware/exception/global.exception.handler";
import {RegisterApiIntegrationImpl} from "../../../integration/api/register/register.api.integration.impl";
import {TokenServiceImpl} from "../../../../application/service/token.service.impl";

export class AuthController {
    private static instance: AuthController;
    private loginWithUserEmailUseCase: LoginWithUserEmailUsecase;
    private verifyTokenUseCase: VerifyTokenUseCase;

    private constructor() {
        this.loginWithUserEmailUseCase = LoginWithUserEmailUsecase.getInstance(
            RegisterApiIntegrationImpl.getInstance(),
            TokenServiceImpl.getInstance()
        );
        this.verifyTokenUseCase = VerifyTokenUseCase.getInstance(
            TokenServiceImpl.getInstance()
        );
    }

    public static getInstance(): AuthController {
        if (!AuthController.instance) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }

    async loginWithEmail(req: any, res: any): Promise<void> {
        try {
            console.log("[AuthController] - Iniciando login com email");
            const userEmail = req.query.email as string;
            const input = {email: userEmail};
            const output = await this.loginWithUserEmailUseCase.execute(input);
            res.status(200).json(output);
        } catch (error: any) {
            GlobalExceptionHandler.handleError(error, req, res);
        }
    }

    async verifyToken(req: any, res: any): Promise<void> {
        try {
            console.log("[AuthController] - Iniciando verificação de token");
            const token = req.headers.authorization as string;
            const output = await this.verifyTokenUseCase.execute(token);
            res.status(200).json(output);
        } catch (error: any) {
            GlobalExceptionHandler.handleError(error, req, res);
        }
    }
}