export interface RegisterApiIntegration {
    findUserAndAddressByUserId(userId: string): Promise<FindUserWithAddressApiOutput>;
}

export interface FindUserWithAddressApiOutput {
    id: string;
    name: string;
    email: string;
    cpf: string;
    address: FindAddressApiOutput[];

}

export interface FindAddressApiOutput{
    id: string;
    userId: string;
    street: string;
    number: number;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    cep: number;
}