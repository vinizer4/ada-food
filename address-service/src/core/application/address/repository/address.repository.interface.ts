import {Address} from "cluster";

export interface AddressRepository {
    createAddress(address: Address): Promise<Address>;

    findAddressByUserId(userId: string): Promise<Address | null>;

    findAddressById(id: string): Promise<Address | null>;

    updateAddress(id: string, address: Address): Promise<void>;

    deleteAddress(id: string): Promise<void>;
}