import {RegisterApiIntegration} from "../../../integration/api/register/RegisterApiIntegration";
import {TokenService} from "../../service/token/token.service";
import {LoginWithUserEmailUseCaseInput} from "./input/login.usecase.input";
import {LoginWithUserEmailUseCaseOutput} from "./output/login.usecase.output";
import {ResourceNotfoundException} from "../../../exception/resource.notfound.exception";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";
import {AuthenticationException} from "../../../exception/authentication.exception";

export class LoginWithUserEmailUsecase {
    private static instance: LoginWithUserEmailUsecase;

    private registerApiIntegration: RegisterApiIntegration;

    private tokenService: TokenService;

    private constructor(
        registerApiIntegration: RegisterApiIntegration,
        tokenService: TokenService
    ) {
        this.registerApiIntegration = registerApiIntegration;
        this.tokenService = tokenService;
    }

    public static getInstance(
        registerApiIntegration: RegisterApiIntegration,
        tokenService: TokenService
    ): LoginWithUserEmailUsecase {
        if (!LoginWithUserEmailUsecase.instance) {
            LoginWithUserEmailUsecase.instance =
                new LoginWithUserEmailUsecase(
                    registerApiIntegration,
                    tokenService
                );
        }
        return LoginWithUserEmailUsecase.instance;
    }

    async execute(input: LoginWithUserEmailUseCaseInput): Promise<LoginWithUserEmailUseCaseOutput> {
        try {
            console.log("[LoginUserUsecase] - Buscando usuário com email: ", input.email);

            const user = await this.registerApiIntegration.findUserByEmail(input);

            const validUser = this.validateUserResponse(user);

            console.log("[LoginUserUsecase] - Usuário buscado com sucesso: ", user);

            const token = this.tokenService.generateTokenByUserEmail(validUser);

            return this.mapperToOutput(validUser, token);
        }
        catch (error: any) {
            throw this.exceptionHandler(error);
        }
    }

    private validateUserResponse(user: any) {
        if (!user) {
            console.error("[LoginUserUsecase] - Usuário não encontrado");
            throw new ResourceNotfoundException("Usuário não encontrado");
        }
        return user;
    }

    private mapperToOutput(user: any, token: string): LoginWithUserEmailUseCaseOutput {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }

    private exceptionHandler(error: any): ResourceNotfoundException {
        if (error instanceof ResourceNotfoundException) {
            return  error;
        }
        console.error("[LoginUserUsecase] - Erro na execução do usecase de login de usuário: ", error);
        return new AuthenticationException("Erro na autenticação de usuário");
    }
}