import {
    FindUserWithAddressApiOutput,
    RegisterApiIntegration
} from "../../../../core/application/integration/api/register/register.api.integration";
import axios from "axios";
import {ResourceNotfoundException} from "../../../../core/exception/resource.notfound.exception";
import {IntegrationException} from "../../../../core/exception/integration.exception";

export class RegisterApiIntegrationImpl implements RegisterApiIntegration {
    private static instance: RegisterApiIntegrationImpl;

    private constructor() {
    }

    public static getInstance(): RegisterApiIntegrationImpl {
        if (!RegisterApiIntegrationImpl.instance) {
            RegisterApiIntegrationImpl.instance = new RegisterApiIntegrationImpl();
        }
        return RegisterApiIntegrationImpl.instance;
    }

    async findUserAndAddressByUserId(userId: string): Promise<FindUserWithAddressApiOutput> {
        try {
            const response = await axios.get(`${process.env.REGISTER_URL}/userwithaddress/${userId}`);
            this.validateUserResponse(response);
            return this.responseToOutputFindMapper(response.data);
        } catch (error) {
            if (error instanceof ResourceNotfoundException || error instanceof IntegrationException) {
                throw error;
            }
            console.error("[FindUserByIdUseCase] - Erro na busca de usuário: ", error);
            throw new IntegrationException("Erro na busca de usuário");
        }
    }

    private validateUserResponse(response: any) {
        if (response.status === 404) {
            console.error("[FindUserByIdUseCase] - Usuário não encontrado");
            throw new ResourceNotfoundException("Usuário não encontrado");
        }
        if (response.status !== 200) {
            console.log("[FindUserByIdUseCase] - Erro na busca de usuário: ", response.data);
            throw new IntegrationException("Erro na busca de usuário");
        }
    }

    private responseToOutputFindMapper(response: any): FindUserWithAddressApiOutput {
        return {
            id: response.id,
            name: response.name,
            email: response.email,
            cpf: response.cpf,
            address: response.address
        }
    }
}