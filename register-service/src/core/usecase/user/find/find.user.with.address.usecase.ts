import {UserRepository} from "../../../application/user/repository/user.repository.interface";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";
import {FindUserWithAddressOutputUsecase} from "./output/find.output.usecase";
import {FindUserByIdInputUsecase} from "./input/find.input.usecase";
import {ResourceNotfoundException} from "../../../exception/resource.notfound.exception";
import {AddressApiIntegration} from "../../../application/integration/api/address/address.api.integration";
import Address from "../../../domain/address/entity/address";
import {IntegrationException} from "../../../exception/integration.exception";

export class FindUserByIdWithAddressUseCase {
    private static instance: FindUserByIdWithAddressUseCase;
    private readonly userRepository: UserRepository;
    private readonly addressApiIntegration: AddressApiIntegration;

    private constructor(
        userRepository: UserRepository,
        addressApiIntegration: AddressApiIntegration
    ) {
        this.userRepository = userRepository;
        this.addressApiIntegration = addressApiIntegration;
    }

    public static getInstance(
        userRepository: UserRepository,
        addressApiIntegration: AddressApiIntegration
    ): FindUserByIdWithAddressUseCase {
        if (!FindUserByIdWithAddressUseCase.instance) {
            FindUserByIdWithAddressUseCase.instance =
                new FindUserByIdWithAddressUseCase(
                    userRepository,
                    addressApiIntegration
                );
        }
        return FindUserByIdWithAddressUseCase.instance;
    }

    async execute(input: FindUserByIdInputUsecase): Promise<FindUserWithAddressOutputUsecase> {
        try {
            console.log("[FindUserByIdUseCase] - Buscando usuário com id: ", input.id);

            const user = await this.userRepository.findUserById(input.id);

            const validUser = this.validateUserResponse(user);

            console.log("[FindUserByIdUseCase] - Usuário buscado com sucesso: ", user);

            const addresses = await this.findAddressByUserId(validUser.id);

            const validAddresses = this.validateAddressResponse(addresses);

            return this.mapperToOutput(validUser, validAddresses);
        }
        catch (error: any) {
            throw this.exceptionHandler(error);
        }
    }

    private validateUserResponse(user: any) {
        if (!user) {
            console.error("[FindUserByIdUseCase] - Usuário não encontrado");
            throw new ResourceNotfoundException("Usuário não encontrado");
        }
        return user;
    }

    private async findAddressByUserId(userId: string): Promise<Address[] | Error> {
        return await this.addressApiIntegration.findAddressByUser(userId);
    }

    private mapperToOutput(user: any, addresses: Address[]): FindUserWithAddressOutputUsecase {
        const addressesOutput = addresses.map(address => {
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
            }
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            address: addressesOutput
        }
    }

    private exceptionHandler(error: any): UsecaseExecutionException {
        if (error instanceof ResourceNotfoundException) {
            return  error;
        }
        console.error("[FindUserByEmailUseCase] - Erro na execução do usecase de busca de usuário: ", error);
        return new UsecaseExecutionException("Erro na busca de usuário");
    }

    private validateAddressResponse(addresses: Address[] | Error) {
        if (addresses instanceof Error) {
            console.error("[FindAddressByUserUsecase] - Erro na busca de endereços por usuário: ", addresses);
            throw new IntegrationException("Erro na busca de endereços por usuário");
        }
        return addresses;
    }
}