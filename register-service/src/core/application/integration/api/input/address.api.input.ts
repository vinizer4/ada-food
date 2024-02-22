export interface CreateAddressApiInput {
    userId: string,
    street: string,
    number: number,
    neighborhood: string,
    city: string,
    state: string,
    country: string,
    cep: number
}

export interface UpdateAddressApiInput {
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