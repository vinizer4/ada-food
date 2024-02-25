import {
    CreateAddressUseCaseInput,
    CreateUserInputUsecase,
    CreateUserWithAddressInputUsecase
} from "./input/create.user.input.usecase";
import {CreateUserWithAddressOutputUsecase} from "./output/create.user.output.usecase";
import {UserRepository} from "../../../application/user/repository/user.repository.interface";
import {UserFactory} from "../../../domain/user/factory/user.factory";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";
import {MessagingBroker} from "../../../application/integration/message/messaging.port";
import User from "../../../domain/user/entity/user";
import Address from "../../../domain/address/entity/address";
import {AddressFactory} from "../../../domain/address/factory/address.factory";
import {AddressApiIntegration} from "../../../application/integration/api/address/address.api.integration";
import {AddressApiOutput} from "../../../application/integration/api/address/output/address.api.output";

export class CreateUserWithAddressUsecase {
    private static instance: CreateUserWithAddressUsecase;
    private readonly userRepository: UserRepository;
    private readonly messageBroker: MessagingBroker;
    private readonly addressApiIntegration: AddressApiIntegration;

    private constructor(
        userRepository: UserRepository,
        messageBroker: MessagingBroker,
        addressApiIntegration: AddressApiIntegration
    ) {
        this.userRepository = userRepository;
        this.messageBroker = messageBroker;
        this.addressApiIntegration = addressApiIntegration;
    }

    public static getInstance(
        userRepository: UserRepository,
        messageBroker: MessagingBroker,
        addressApiIntegration: AddressApiIntegration
    ): CreateUserWithAddressUsecase {
        if (!CreateUserWithAddressUsecase.instance) {
            CreateUserWithAddressUsecase.instance = new CreateUserWithAddressUsecase(
                userRepository,
                messageBroker,
                addressApiIntegration
            );
        }
        return CreateUserWithAddressUsecase.instance;
    }

    async execute(input: CreateUserWithAddressInputUsecase): Promise<CreateUserWithAddressOutputUsecase> {
        try {
            console.log("[CreateUserUsecase] - Criando usuário com input: ", input);
            const user = this.createInstanceOfUser(input);

            const createdUser = await this.sendUserToDatabase(user);
            console.log("[CreateUserUsecase] - Usuário criado com sucesso: ", user);

            const addresses = this.createAddressWithUserID(createdUser.id, input.address);

            const createdAddresses = await this.executeCreateAddressApi(addresses);

            const userOutput = this.mapperUserToOutputUser(createdUser, createdAddresses);

            await this.sendEmailNotification(userOutput);

            return userOutput;
        } catch (error: any) {
            console.error("[CreateUserUsecase] - Erro na execução do usecase de criação de usuário: ", error);
            throw new UsecaseExecutionException("Erro na criação de usuário");
        }
    }

    private async sendEmailNotification(output: CreateUserWithAddressOutputUsecase): Promise<void> {
        const message = JSON.stringify({
            id: output.id,
            name: output.name,
            email: output.email,
            addresses: output.address
        });
        await this.messageBroker.sendMessage("user-register-email-notification", message);
    }

    private async sendUserToDatabase(user: User) {
        const createdUser = await this.userRepository.createUser(user);
        return createdUser;
    }

    private mapperUserToOutputUser(user: User, address: Address[]): CreateUserWithAddressOutputUsecase {
        const addressesOutput = address.map(address => {
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

    private createInstanceOfUser(input: CreateUserInputUsecase): User {
        return UserFactory.create(input.name, input.email, input.cpf);
    }

    private async executeCreateAddressApi(address: Address[]): Promise<Address[]> {
        const createdAddresses: Address[] = [];

        for (const address1 of address) {
            const createdAddress = await this.addressApiIntegration.createAddress(address1);
            const adressInstance = this.addressApiIntegrationResponseToAddress(createdAddress);
            createdAddresses.push(adressInstance);
        }

        return createdAddresses;
    }

    private addressApiIntegrationResponseToAddress(address: AddressApiOutput): Address {
        return AddressFactory.create(address);
    }

    private createAddressWithUserID(userId: string, addresses: CreateAddressUseCaseInput[]): Address[] {
        return addresses.map(address => {
            return AddressFactory.create({
                userId: userId,
                street: address.street,
                number: address.number,
                neighborhood: address.neighborhood,
                city: address.city,
                state: address.state,
                country: address.country,
                cep: address.cep
            });
        });
    }
}