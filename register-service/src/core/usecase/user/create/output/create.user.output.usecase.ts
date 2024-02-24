export interface CreateUserOutputUsecase {
    id: string;
    name: string;
    email: string;
    cpf: string;
}

export interface CreateUserWithAddressOutputUsecase {
    id: string;
    name: string;
    email: string;
    cpf: string;
    address: CreateAddressUseCaseOutput[];
}

export interface CreateAddressUseCaseOutput {
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