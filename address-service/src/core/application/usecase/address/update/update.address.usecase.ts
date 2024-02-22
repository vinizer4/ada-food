import {AddressRepository} from "../../../repository/address/address.repository.interface";
import {AddressFactory} from "../../../../domain/address/factory/address.factory";
import {CreateAddressUseCaseInput} from "../create/input/create.address.usecase.input";
import Address from "../../../../domain/address/entity/address";
import {UsecaseExecutionException} from "../../../../exception/usecase.execution.exception";

export class UpdateAddressUsecase {
    private static instance: UpdateAddressUsecase;

    private readonly addressRepository: AddressRepository;

    private constructor(addressRepository: AddressRepository) {
        this.addressRepository = addressRepository;
    }

    public static getInstance(addressRepository: AddressRepository): UpdateAddressUsecase {
        if (!UpdateAddressUsecase.instance) {
            UpdateAddressUsecase.instance = new UpdateAddressUsecase(addressRepository);
        }
        return UpdateAddressUsecase.instance;
    }

    async execute(input: CreateAddressUseCaseInput): Promise<void> {
        try {
            console.log("[UpdateAddressUsecase] - Atualizando endereço com input: ", input);
            const address = this.createInstanceOfAddress(input);

            await this.sendAddressToDatabase(address);
            console.log("[UpdateAddressUsecase] - Endereço atualizado com sucesso: ", address);

            return
        } catch (error: any) {
            console.error("[UpdateAddressUsecase] - Erro na execução do usecase de update de endereço: ", error);
            throw new UsecaseExecutionException("Erro na atualização de endereço");
        }
    }

    private createInstanceOfAddress(input: CreateAddressUseCaseInput): Address {
        return AddressFactory.create(input);
    }

    private async sendAddressToDatabase(address: Address): Promise<void> {
        return this.addressRepository.updateAddress(address.id, address);
    }
}