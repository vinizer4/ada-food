import {IntegrationException} from "../../../core/exception/integration.exception";
import {CepApiIntegration} from "../../../core/application/integration/api/cep.api.integration";
import axios from "axios";
import {ViaCepApiOutput} from "./output/via.cep.api.output";
import {ResourceNotfoundException} from "../../../core/exception/resource.notfound.exception";

export class ViaCepApiIntegration implements CepApiIntegration {
    private static instance: ViaCepApiIntegration;

    private constructor() {}

    public static getInstance(): ViaCepApiIntegration {
        if (!ViaCepApiIntegration.instance) {
            ViaCepApiIntegration.instance = new ViaCepApiIntegration();
        }
        return ViaCepApiIntegration.instance;
    }

    async getAddressByCep(cep: string): Promise<ViaCepApiOutput> {
        try {
            cep = this.formatCep(cep);
            const response = await axios.get(`${process.env.VIA_CEP_API_URL}/${cep}/json`);
            this.validateResponse(response.data);
            return response.data;
        } catch (error) {
            console.log("[ViaCepApiIntegration] Falha ao buscar endereço pelo CEP");
            throw new IntegrationException("Falha ao buscar endereço pelo CEP")
        }
    }

    private formatCep(cep: string): string {
        return cep.replace("-", "");
    }

    private validateResponse(response: any): void {
        if (response.erro) {
            throw new IntegrationException("CEP inválido");
        }
        if (!response.data) {
            throw new ResourceNotfoundException("Endereço não encontrado")
        }
    }
}