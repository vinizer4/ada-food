import {AddressRepository} from "../../../repository/address/address.repository.interface";
import {UsecaseExecutionException} from "../../../../exception/usecase.execution.exception";
import Address from "../../../../domain/address/entity/address";
import {ResourceNotfoundException} from "../../../../exception/resource.notfound.exception";

export class FindAddressByUserUsecase {
    private static instance: FindAddressByUserUsecase;

    private readonly addressRepository: AddressRepository;

    private constructor(addressRepository: AddressRepository) {
        this.addressRepository = addressRepository;
    }

    public static getInstance(addressRepository: AddressRepository): FindAddressByUserUsecase {
        if (!FindAddressByUserUsecase.instance) {
            FindAddressByUserUsecase.instance = new FindAddressByUserUsecase(addressRepository);
        }
        return FindAddressByUserUsecase.instance;
    }

    async execute(userId: string): Promise<Address[] | null> {
        try {
            console.log("[FindAddressByUserUsecase] - Buscando endereços do usuário com id: ", userId);
            const addresses = await this.addressRepository.findAddressesByUserId(userId);
            console.log("[FindAddressByUserUsecase] - Endereços encontrados: ", addresses);
            this.validateResponse(addresses);
            return addresses;
        } catch (error: any) {
            console.error("[FindAddressByUserUsecase] - Erro na execução do usecase de busca de endereços por usuário: ", error);
            throw new UsecaseExecutionException("Erro na busca de endereços por usuário");
        }
    }

    private validateResponse(addresses: Address[] | null) {
        if (!addresses) {
            console.error("[FindAddressByUserUsecase] - Endereços não encontrados");
            throw new ResourceNotfoundException("Endereços não encontrados");
        }
    }
}