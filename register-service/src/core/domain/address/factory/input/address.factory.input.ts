export interface AddressFactoryInput {
    userId: string,
    street: string,
    number: number,
    neighborhood: string,
    city: string,
    state: string,
    country: string,
    cep: number
}

export interface AddressFactoryWithIdInput {
    id: string,
    userId: string,
    street: string,
    number: number,
    neighborhood: string,
    city: string,
    state: string,
    country: string,
    cep: number
}