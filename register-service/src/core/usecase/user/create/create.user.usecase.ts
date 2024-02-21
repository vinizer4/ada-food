import {CreateUserInputUsecase} from "./input/create.user.input.usecase";
import {CreateUserOutputUsecase} from "./output/create.user.output.usecase";
import {UserRepository} from "../../../application/user/repository/user.repository.interface";
import {UserFactory} from "../../../domain/user/factory/user.factory";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";

export class CreateUserUsecase {
    private static instance: CreateUserUsecase;
    private readonly userRepository: UserRepository;

    private constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public static getInstance(userRepository: UserRepository): CreateUserUsecase {
        if (!CreateUserUsecase.instance) {
            CreateUserUsecase.instance = new CreateUserUsecase(userRepository);
        }
        return CreateUserUsecase.instance;
    }

    async execute(input: CreateUserInputUsecase): Promise<CreateUserOutputUsecase> {
        try {
            console.log("[CreateUserUsecase] - Criando usuário com input: ", input);
            const user = UserFactory.create(input.name, input.email, input.cpf);

            const createdUser = await this.userRepository.createUser(user);
            console.log("[CreateUserUsecase] - Usuário criado com sucesso: ", user);

            return {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email,
                cpf: createdUser.cpf
            }
        } catch (error: any) {
            console.error("[CreateUserUsecase] - Erro na execução do usecase de criação de usuário: ", error);
            throw new UsecaseExecutionException("Erro na criação de usuário");
        }
    }
}