import {UsecaseExecutionException} from "../../../../exception/usecase.execution.exception";
import {AddressRepository} from "../../../address/repository/address.repository.interface";

export class deleteAdressUseCase {
    private static instance: deleteAdressUseCase;
    private readonly addressRepository: AddressRepository;

    private constructor(addressRepository: AddressRepository) {
        this.addressRepository = addressRepository;
    }

    public static getInstance(addressRepository: AddressRepository): deleteAdressUseCase {
        if (!deleteAdressUseCase.instance) {
            deleteAdressUseCase.instance = new deleteAdressUseCase(addressRepository);
        }
        return deleteAdressUseCase.instance;
    }

    async execute(input: string): Promise<void> {
        try {
            console.log("[deleteAdressUseCase] - Deletando endereço com id: ", input);

            await this.addressRepository.deleteAddress(input);
            console.log("[deleteAdressUseCase] - Endereço deletado com sucesso");

            return
        } catch (error: any) {
            console.error("[deleteAdressUseCase] - Erro na execução do usecase de delete de endereço: ", error);
            throw new UsecaseExecutionException("Erro na deleção de endereço");
        }
    }
}