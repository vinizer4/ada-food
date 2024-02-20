import { v4 as uuidv4 } from 'uuid';
import Address from "../../address/entity/address";

export default class User {
    private _id: string;
    private _name: string;
    private _email: string;
    private _cpf: string;
    private _addresses: Address[];

    private constructor(name: string, email: string, cpf: string) {
        this._id = uuidv4();
        this._name = name;
        this._email = email;
        this._cpf = cpf;
        this._addresses = [];
        this.validate();
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error('Name is required');
        }
        if (this._email.length === 0) {
            throw new Error('Email is required');
        }
        if (this._cpf.length === 0) {
            throw new Error('CPF is required');
        }
    }

    addAddress(address: Address) {
        this._addresses.push(address);
    }

    removeAddress(addressId: string) {
        this._addresses = this._addresses.filter(address => address.id !== addressId);
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
        this.validate();
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
        this.validate();
    }

    get cpf(): string {
        return this._cpf;
    }

    set cpf(value: string) {
        this._cpf = value;
        this.validate();
    }

    get addresses(): Address[] {
        return this._addresses;
    }

    public static createUser(name: string, email: string, cpf: string): User {
        return new User(name, email, cpf);
    }

    public toUpdateObjectMapper() {
        return {
            name: this._name,
            email: this._email,
            cpf: this._cpf,
            addresses: this._addresses,
        };
    }
}