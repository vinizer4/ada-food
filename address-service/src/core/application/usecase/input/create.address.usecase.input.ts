export interface CreateAddressUseCaseInput {
    userId: string,
    street: string,
    number: string,
    neighborhood: string,
    city: string,
    state: string,
    country: string,
    cep: number
}