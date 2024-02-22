export interface CepApiIntegration {
    getAddressByCep(cep: string): Promise<any>;
}