import {CreateUserInputUsecase} from "./input/create.user.input.usecase";
import {CreateUserOutputUsecase} from "./output/create.user.output.usecase";
import {UserRepository} from "../../../application/user/repository/user.repository.interface";
import {UserFactory} from "../../../domain/user/factory/user.factory";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";

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
        try {
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
        } catch (error: any) {
            console.error("[CreateUserUsecase] - Error creating user: ", error);
            throw new UsecaseExecutionException("Error creating user.");
        }
    }
}