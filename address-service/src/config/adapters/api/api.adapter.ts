import {CepApiIntegration} from "../../../core/application/integration/api/cep.api.integration";
import {ViaCepApiIntegration} from "../../../infra/external/api/via.cep.api.integration";

export class ApiAdapter {
    private static cepApiIntegration: CepApiIntegration;

    static getCepApiIntegration(): CepApiIntegration {
        if (!this.cepApiIntegration) {
            throw new Error("Initializer not run.");
        }
        return this.cepApiIntegration;
    }

    static createCepApiIntegration() {
        if (process.env.CEP_API === 'viacep') {
            this.cepApiIntegration = ViaCepApiIntegration.getInstance();
        } else {
            throw new Error('Invalid api');
        }
    }
}