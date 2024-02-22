import {AddressApiIntegration} from "../../../../core/application/integration/api/address.api.integration";
import {
    CreateAddressApiInput,
    UpdateAddressApiInput
} from "../../../../core/application/integration/api/input/address.api.input";
import {AddressApiOutput} from "../../../../core/application/integration/api/output/address.api.output";
import {Promise} from "mongoose";

export class AddressApiIntegrationImpl implements AddressApiIntegration {
    private static instance: AddressApiIntegrationImpl;

    private constructor() {}

    public static getInstance(): AddressApiIntegration {
        if (!AddressApiIntegrationImpl.instance) {
            AddressApiIntegrationImpl.instance = new AddressApiIntegrationImpl();
        }
        return AddressApiIntegrationImpl.instance;
    }

    async createAddress(input: CreateAddressApiInput): Promise<AddressApiOutput> {
        return Promise.resolve(undefined);
    }

    async deleteAddress(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    async findAddressByUser(userId: string): Promise<AddressApiOutput> {
        return Promise.resolve(undefined);
    }

    async getAddressByCep(cep: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    async updateAddress(address: UpdateAddressApiInput): Promise<void> {
        return Promise.resolve(undefined);
    }


}