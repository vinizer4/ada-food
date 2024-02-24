export interface FindUserOutputUsecase {
    id: string;
    name: string;
    email: string;
    cpf: string;
}

export interface FindUserWithAddressOutputUsecase {
    id: string;
    name: string;
    email: string;
    cpf: string;
    address: FindAddressOutputUsecase[];

}

export interface FindAddressOutputUsecase {
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