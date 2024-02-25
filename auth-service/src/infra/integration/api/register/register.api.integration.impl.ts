import {RegisterApiIntegration} from "../../../../core/integration/api/register/RegisterApiIntegration";
import {FindUserByEmailApiInput} from "../../../../core/integration/api/register/input/register.api.input";
import {FindUserApiOutput} from "../../../../core/integration/api/register/output/register.api.output";
import axios from "axios";
import {ResourceNotfoundException} from "../../../../core/exception/resource.notfound.exception";
import {IntegrationException} from "../../../../core/exception/integration.exception";

export class RegisterApiIntegrationImpl implements RegisterApiIntegration {
    private static instance: RegisterApiIntegrationImpl;

    private constructor() {}

    public static getInstance(): RegisterApiIntegration {
        if (!RegisterApiIntegrationImpl.instance) {
            RegisterApiIntegrationImpl.instance = new RegisterApiIntegrationImpl();
        }
        return RegisterApiIntegrationImpl.instance;
    }

    async findUserByEmail(input: FindUserByEmailApiInput): Promise<FindUserApiOutput> {
        try {
            const response = await axios.get(`${process.env.REGISTER_URL}/user/email?email=${input.email}`);
            this.validateResponseToFind(response);
            return this.responseToOutputFindMapper(response.data);
        }
        catch (error: any) {
            console.error("Error calling Register Service", error);
            throw new IntegrationException("Failed to find user in Register Service");
        }
    }

    private validateResponseToFind(response: any): void {
        if (response.status === 404) {
            console.error("[RegisterApiIntegration] - Usuário não encontrado");
            throw new ResourceNotfoundException("Usuário não encontrado")
        }
        if (response.status !== 200) {
            console.error("[RegisterApiIntegration] - Erro ao buscar usuário");
            throw new IntegrationException("Erro ao buscar usuário")
        }
    }

    private responseToOutputFindMapper(response: any): FindUserApiOutput {
        return {
            id: response.id,
            name: response.name,
            email: response.email,
            cpf: response.cpf
        }
    }
}