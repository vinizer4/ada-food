import {AddressRepository} from "../../../repository/address/address.repository.interface";
import {CreateAddressUseCaseInput} from "./input/create.address.usecase.input";
import {CreateAddressUseCaseOutput} from "./output/create.address.usecase.output";
import {UsecaseExecutionException} from "../../../../exception/usecase.execution.exception";
import {AddressFactory} from "../../../../domain/address/factory/address.factory";
import Address from "../../../../domain/address/entity/address";

export class CreateAddressUsecase {
    private static intance: CreateAddressUsecase;

    private readonly addressRepository: AddressRepository;

    private constructor(addressRepository: AddressRepository) {
        this.addressRepository = addressRepository;
    }

    public static getInstance(addressRepository: AddressRepository): CreateAddressUsecase {
        if (!CreateAddressUsecase.intance) {
            CreateAddressUsecase.intance = new CreateAddressUsecase(addressRepository);
        }
        return CreateAddressUsecase.intance;
    }

    async execute (input: CreateAddressUseCaseInput): Promise<CreateAddressUseCaseOutput> {
        try {
            console.log("[CreateAddressUsecase] - Criando endereço com input: ", input);
            const address = this.createInstanceOfAddress(input);

            const createdAddress = await this.sendAddressToDatabase(address);
            console.log("[CreateAddressUsecase] - Endereço criado com sucesso: ", address);

            const output = this.mapperAddressToOutput(createdAddress);

            return output;
        } catch (error: any) {
            console.log("[CreateAddressUsecase] - Erro na execução do usecase de criação de endereço: ", error);
            throw new UsecaseExecutionException("Erro na criação de endereço");
        }
    }

    private createInstanceOfAddress(input: CreateAddressUseCaseInput): Address {
        return AddressFactory.create(input);
    }

    private async sendAddressToDatabase(address: Address): Promise<Address> {
        return this.addressRepository.createAddress(address);
    }

    private mapperAddressToOutput(address: Address): CreateAddressUseCaseOutput {
        return {
            id: address.id,
            userId: address.userId,
            street: address.street,
            number: address.number,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            country: address.country,
            cep: address.cep
        };
    }
}