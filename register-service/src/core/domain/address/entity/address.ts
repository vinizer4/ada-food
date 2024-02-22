import { v4 as uuidv4 } from 'uuid';

export default class Address {
    id: string;
    userId: string;
    street: string;
    number: number;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    cep: number;

    private constructor(userId: string, street: string, number: number, neighborhood: string, city: string, state: string, country: string, cep: number) {
        this.id = uuidv4();
        this.userId = userId;
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.country = country;
        this.cep = cep;
        this.validate();
    }

    validate() {
        if (!this.street || this.street.length === 0) {
            throw new Error('Street is required');
        }
        if (!this.number || this.number === 0) {
            throw new Error('Number is required');
        }
        if (!this.neighborhood || this.neighborhood.length === 0) {
            throw new Error('Neighborhood is required');
        }
        if (!this.city || this.city.length === 0) {
            throw new Error('City is required');
        }
        if (!this.state || this.state.length === 0) {
            throw new Error('State is required');
        }
        if (!this.country || this.country.length === 0) {
            throw new Error('Country is required');
        }

        if (!this.cep || this.cep <= 0) {
            throw new Error('CEP is required and must be valid');
        }
    }

    static create(userId: string, street: string, number: number, neighborhood: string, city: string, state: string, country: string, cep: number) {
        return new Address(userId, street, number, neighborhood, city, state, country, cep);
    }

    static createWithId(id: string, userId: string, street: string, number: number, neighborhood: string, city: string, state: string, country: string, cep: number) {
        const address = new Address(userId, street, number, neighborhood, city, state, country, cep);
        address.id = id;
        return address;
    }
}
