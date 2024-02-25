import {LoginWithUserEmailUsecase} from "../../core/domain/usecases/login/login.with.email.usecase";
import {RegisterApiIntegrationImpl} from "../../infra/integration/api/register/register.api.integration.impl";
import {TokenServiceImpl} from "../../application/service/token.service.impl";
import {VerifyTokenUseCase} from "../../core/domain/usecases/verif-token/verify.token.use.case";

export class Initializer {
    static async initialize() {
        const registerApiIntegration = RegisterApiIntegrationImpl.getInstance();
        const tokenService = TokenServiceImpl.getInstance();
        LoginWithUserEmailUsecase.getInstance(
            registerApiIntegration,
            tokenService
        )
        VerifyTokenUseCase.getInstance(
            tokenService
        )

    }
}
