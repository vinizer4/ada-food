import {CreateAddressApiInput} from "./input/address.api.input";
import {AddressApiOutput} from "./output/address.api.output";
import Address from "../../../../domain/address/entity/address";

export interface AddressApiIntegration {
    createAddress(input: CreateAddressApiInput): Promise<AddressApiOutput>;
    findAddressByUser(userId: string): Promise<Address[] | Error>;
}