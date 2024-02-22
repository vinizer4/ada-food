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