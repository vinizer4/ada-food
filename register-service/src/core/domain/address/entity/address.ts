import { v4 as uuidv4 } from 'uuid';

export default class Address {
    id: string;
    userId: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    cep: number;

    constructor(userId: string, street: string, number: string, neighborhood: string, city: string, state: string, country: string, cep: number) {
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
        if (!this.number || this.number.length === 0) {
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
        // Assuming CEP is a number, we check if it's greater than 0. Adjust validation as necessary.
        if (!this.cep || this.cep <= 0) {
            throw new Error('CEP is required and must be valid');
        }
    }
}
