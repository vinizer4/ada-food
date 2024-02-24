import {AddressApiIntegration} from "../../../../core/application/integration/api/address.api.integration";
import {
    CreateAddressApiInput
} from "../../../../core/application/integration/api/input/address.api.input";
import {AddressApiOutput} from "../../../../core/application/integration/api/output/address.api.output";
import Address from "../../../../core/domain/address/entity/address";
import axios from "axios";
import {IntegrationException} from "../../../../core/exception/integration.exception";
import {ResourceNotfoundException} from "../../../../core/exception/resource.notfound.exception";
import {AddressFactory} from "../../../../core/domain/address/factory/address.factory";
import {AddressFactoryWithIdInput} from "../../../../core/domain/address/factory/input/address.factory.input";

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
        try {
            const response = await axios.post(`${process.env.ADDRESS_URL}/addresses`, input);
            this.validateResponseToCreate(response);
            return this.responseToOutputCreateMapper(response.data);
        } catch (error: any) {
            console.error("Error calling Address Service", error);
            throw new Error("Failed to create address in Address Service");
        }
    }

    async findAddressByUser(userId: string): Promise<Address[] | null> {
        try {
            const response = await axios.get(`${process.env.ADDRESS_URL}/addresses/user/${userId}`);
            this.validateResponseToFind(response);
            return this.responseToOutputFindMapper(response.data);
        } catch (error: any) {
            console.error("Error calling Address Service", error);
            throw new Error("Failed to find address in Address Service");
        }
    }

    private validateResponseToCreate(response: any): void {
        if (response.status === 404) {
            console.error("[AddressApiIntegration] - Endereço não encontrado");
            throw new ResourceNotfoundException("Endereço não encontrado")
        }
        if (response.status !== 201) {
            console.error("[AddressApiIntegration] - Erro ao criar endereço");
            throw new IntegrationException("Erro ao criar endereço")
        }
    }

    private validateResponseToFind(response: any): void {
        if (response.status === 404) {
            console.error("[AddressApiIntegration] - Endereço não encontrado");
            throw new ResourceNotfoundException("Endereço não encontrado")
        }
        if (response.status !== 200) {
            console.error("[AddressApiIntegration] - Erro ao buscar endereço");
            throw new IntegrationException("Erro ao buscar endereço")
        }
        if (response.data.length === 0) {
            console.error("[AddressApiIntegration] - Endereço não encontrado");
            throw new ResourceNotfoundException("Endereço não encontrado")
        }
    }

    private responseToOutputCreateMapper(response: any): AddressApiOutput {
        return {
            id: response.id,
            userId: response.userId,
            cep: response.cep,
            street: response.street,
            number: response.number,
            neighborhood: response.neighborhood,
            city: response.city,
            state: response.state,
            country: response.country
        }
    }

    private responseToOutputFindMapper(response: any): Address[] {
        response = this.responseToInputAddressFactoryMapper(response);
        const address: Address[] = []
        if (response.length > 0) {
            response.forEach((element: any) => {
                address.push(AddressFactory.createWithId(element));
            });
        }
        return address;
    }

    private responseToInputAddressFactoryMapper(response: any): AddressFactoryWithIdInput[] {
        const address: AddressFactoryWithIdInput[] = []
        if (response.length > 0) {
            response.forEach((element: any) => {
                address.push({
                    id: element.id,
                    userId: element.userId,
                    street: element.street,
                    number: element.number,
                    neighborhood: element.neighborhood,
                    city: element.city,
                    state: element.state,
                    country: element.country,
                    cep: element.cep
                })
            });
        }
        return address;
    }
}