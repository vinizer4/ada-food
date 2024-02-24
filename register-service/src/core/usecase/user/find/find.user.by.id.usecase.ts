import {UserRepository} from "../../../application/user/repository/user.repository.interface";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";
import {FindUserOutputUsecase} from "./output/find.output.usecase";
import {FindUserByIdInputUsecase} from "./input/find.input.usecase";
import {ResourceNotfoundException} from "../../../exception/resource.notfound.exception";
import User from "../../../domain/user/entity/user";

export class FindUserByIdUseCase {
    private static instance: FindUserByIdUseCase;
    private readonly userRepository: UserRepository;

    private constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public static getInstance(userRepository: UserRepository): FindUserByIdUseCase {
        if (!FindUserByIdUseCase.instance) {
            FindUserByIdUseCase.instance = new FindUserByIdUseCase(userRepository);
        }
        return FindUserByIdUseCase.instance;
    }

    async execute(input: FindUserByIdInputUsecase): Promise<FindUserOutputUsecase> {
        try {
            console.log("[FindUserByIdUseCase] - Buscando usuário com id: ", input.id);

            const user = await this.userRepository.findUserById(input.id);

            const validUser = this.validUser(user, input);

            console.log("[FindUserByIdUseCase] - Usuário buscado com sucesso: ", user);

            return {
                id: validUser.id,
                name: validUser.name,
                email: validUser.email,
                cpf: validUser.cpf
            }
        }
        catch (error: any) {
            throw this.exceptionHandler(error);
        }
    }

    private validUser(
        user: User | null,
        input: FindUserByIdInputUsecase
    ): User {
        if (!user) {
            console.error("[FindUserByIdUseCase] - Usuário não encontrado com id: ", input.id);
            throw new ResourceNotfoundException("Usuário não encontrado");
        }
        return user;
    }

    private exceptionHandler(error: any): UsecaseExecutionException {
        if (error instanceof ResourceNotfoundException) {
            return  error;
        }
        console.error("[FindUserByIdUseCase] - Erro na execução do usecase de busca de usuário: ", error);
        return  new UsecaseExecutionException("Erro na busca de usuário");
    }
}