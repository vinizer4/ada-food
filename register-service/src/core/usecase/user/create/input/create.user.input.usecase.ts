export interface CreateUserInputUsecase {
    name: string;
    email: string;
    cpf: string;
}

export interface CreateUserWithAddressInputUsecase {
    name: string;
    email: string;
    cpf: string;
    address: CreateAddressUseCaseInput[];
}

export interface CreateAddressUseCaseInput {
    street: string,
    number: number,
    neighborhood: string,
    city: string,
    state: string,
    country: string,
    cep: number
}