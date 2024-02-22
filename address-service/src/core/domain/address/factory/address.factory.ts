import {AddressFactoryInput, AddressFactoryWithIdInput} from "./input/address.factory.input";
import Address from "../entity/address";

export class AddressFactory {
    static create(address: AddressFactoryInput): Address {
        return Address.create(address.userId, address.street, address.number, address.neighborhood, address.city, address.state, address.country, address.cep);
    }

    static createWithId(address: AddressFactoryWithIdInput): Address {
        return Address.createWithId(address.id, address.userId, address.street, address.number, address.neighborhood, address.city, address.state, address.country, address.cep);
    }
}