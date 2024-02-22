import {CreateAddressApiInput, UpdateAddressApiInput} from "./input/address.api.input";
import {AddressApiOutput} from "./output/address.api.output";

export interface AddressApiIntegration {
    deleteAddress(id: string): Promise<void>;
    createAddress(input: CreateAddressApiInput): Promise<AddressApiOutput>;
    findAddressByUser(userId: string): Promise<AddressApiOutput>;
    updateAddress(address: UpdateAddressApiInput): Promise<void>;
    getAddressByCep(cep: string): Promise<any>;
}