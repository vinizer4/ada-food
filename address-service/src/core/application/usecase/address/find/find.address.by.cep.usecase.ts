import {CepApiIntegration} from "../../../integration/api/cep.api.integration";

export class FindAddressByCepUsecase {
    private static instance: FindAddressByCepUsecase;

    private cepApiIntegration: CepApiIntegration;

    private constructor(cepApiIntegration: CepApiIntegration) {
        this.cepApiIntegration = cepApiIntegration;
    }

    public static getInstance(cepApiIntegration: CepApiIntegration): FindAddressByCepUsecase {
        if (!FindAddressByCepUsecase.instance) {
            FindAddressByCepUsecase.instance = new FindAddressByCepUsecase(cepApiIntegration);
        }
        return FindAddressByCepUsecase.instance;
    }

    async execute(cep: string): Promise<any> {
        return await this.cepApiIntegration.getAddressByCep(cep);
    }
}