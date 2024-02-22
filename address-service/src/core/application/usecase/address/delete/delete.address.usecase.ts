import {UsecaseExecutionException} from "../../../../exception/usecase.execution.exception";
import {AddressRepository} from "../../../repository/address/address.repository.interface";

export class DeleteAdressUsecase {
    private static instance: DeleteAdressUsecase;
    private readonly addressRepository: AddressRepository;

    private constructor(addressRepository: AddressRepository) {
        this.addressRepository = addressRepository;
    }

    public static getInstance(addressRepository: AddressRepository): DeleteAdressUsecase {
        if (!DeleteAdressUsecase.instance) {
            DeleteAdressUsecase.instance = new DeleteAdressUsecase(addressRepository);
        }
        return DeleteAdressUsecase.instance;
    }

    async execute(id: string): Promise<void> {
        try {
            console.log("[deleteAdressUseCase] - Deletando endereço com id: ", id);

            await this.addressRepository.deleteAddress(id);
            console.log("[deleteAdressUseCase] - Endereço deletado com sucesso");

            return
        } catch (error: any) {
            console.error("[deleteAdressUseCase] - Erro na execução do usecase de delete de endereço: ", error);
            throw new UsecaseExecutionException("Erro na deleção de endereço");
        }
    }
}