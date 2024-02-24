import {CreateUserInputUsecase} from "./input/create.user.input.usecase";
import {CreateUserOutputUsecase} from "./output/create.user.output.usecase";
import {UserRepository} from "../../../application/user/repository/user.repository.interface";
import {UserFactory} from "../../../domain/user/factory/user.factory";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";
import {MessagingBroker} from "../../../application/integration/message/messaging.port";
import User from "../../../domain/user/entity/user";

export class CreateUserUsecase {
    private static instance: CreateUserUsecase;
    private readonly userRepository: UserRepository;
    private readonly messageBroker: MessagingBroker;

    private constructor(
        userRepository: UserRepository,
        messageBroker: MessagingBroker
    ) {
        this.userRepository = userRepository;
        this.messageBroker = messageBroker;
    }

    public static getInstance(
        userRepository: UserRepository,
        messageBroker: MessagingBroker
    ): CreateUserUsecase {
        if (!CreateUserUsecase.instance) {
            CreateUserUsecase.instance = new CreateUserUsecase(
                userRepository,
                messageBroker
            );
        }
        return CreateUserUsecase.instance;
    }

    async execute(input: CreateUserInputUsecase): Promise<CreateUserOutputUsecase> {
        try {
            console.log("[CreateUserUsecase] - Criando usuário com input: ", input);
            const user = this.createInstanceOfUser(input);

            const createdUser = await this.persistUserInDatabase(user);
            console.log("[CreateUserUsecase] - Usuário criado com sucesso: ", user);

            const output = this.mapperUserToOutput(createdUser);

            await this.sendEmailNotification(output);

            return output;
        } catch (error: any) {
            console.error("[CreateUserUsecase] - Erro na execução do usecase de criação de usuário: ", error);
            throw new UsecaseExecutionException("Erro na criação de usuário");
        }
    }

    private async sendEmailNotification(user: CreateUserOutputUsecase): Promise<void> {
        const message = JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
        });
        await this.messageBroker.sendMessage("user-register-email-notification", message);
    }

    private async persistUserInDatabase(user: User) {
        const createdUser = await this.userRepository.createUser(user);
        return createdUser;
    }

    private mapperUserToOutput(user: User): CreateUserOutputUsecase {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            cpf: user.cpf
        }
    }

    private createInstanceOfUser(input: CreateUserInputUsecase): User {
        return UserFactory.create(input.name, input.email, input.cpf);
    }
}