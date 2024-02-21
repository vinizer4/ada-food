import {CreateUserInputUsecase} from "./input/create.user.input.usecase";
import {CreateUserOutputUsecase} from "./output/create.user.output.usecase";
import {UserRepository} from "../../../application/user/repository/user.repository.interface";
import {UserFactory} from "../../../domain/user/factory/user.factory";

export class CreateUserUseCase {
    private static instance: CreateUserUseCase;
    private readonly userRepository: UserRepository;

    private constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public static getInstance(userRepository: UserRepository): CreateUserUseCase {
        if (!CreateUserUseCase.instance) {
            CreateUserUseCase.instance = new CreateUserUseCase(userRepository);
        }
        return CreateUserUseCase.instance;
    }

    async execute(input: CreateUserInputUsecase): Promise<CreateUserOutputUsecase> {
        console.log("[CreateUserUsecase] - Creating user with input: ", input);
        const user = UserFactory.create(input.name, input.email, input.cpf);

        await this.userRepository.createUser(user);
        console.log("[CreateUserUsecase] - User created: ", user);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            cpf: user.cpf
        };
    }
}