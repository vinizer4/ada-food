import {UserRepository} from "../../../application/user/repository/user.repository.interface";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";
import {FindUserOutputUsecase} from "./output/find.output.usecase";
import {FindUserByEmailInputUsecase} from "./input/find.input.usecase";
import {ResourceNotfoundException} from "../../../exception/resource.notfound.exception";
import User from "../../../domain/user/entity/user";

export class FindUserByEmailUseCase {
    private static instance: FindUserByEmailUseCase;
    private readonly userRepository: UserRepository;

    private constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public static getInstance(userRepository: UserRepository): FindUserByEmailUseCase {
        if (!FindUserByEmailUseCase.instance) {
            FindUserByEmailUseCase.instance = new FindUserByEmailUseCase(userRepository);
        }
        return FindUserByEmailUseCase.instance;
    }

    async execute(input: FindUserByEmailInputUsecase): Promise<FindUserOutputUsecase> {
        try {
            console.log("[FindUserByEmailUseCase] - Buscando usuário por email: ", input.email);

            const user = await this.userRepository.findUserByEmail(input.email);

            const validUser = this.validUser(user, input);

            console.log("[FindUserByEmailUseCase] - Usuário buscado com sucesso: ", validUser);

            return {
                id: validUser.id,
                name: validUser.name,
                email: validUser.email,
                cpf: validUser.cpf
            }
        } catch (error: any) {
            throw this.exceptionHandler(error);
        }
    }

    private exceptionHandler(error: any): UsecaseExecutionException {
        if (error instanceof ResourceNotfoundException) {
            return  error;
        }
        console.error("[FindUserByEmailUseCase] - Erro na execução do usecase de busca de usuário: ", error);
        return new UsecaseExecutionException("Erro na busca de usuário");
    }

    private validUser(user: User | null, input: FindUserByEmailInputUsecase): User {
        if (!user) {
            console.error("[FindUserByEmailUseCase] - Usuário não encontrado com email: ", input.email);
            throw new ResourceNotfoundException("Usuário não encontrado");
        }
        return user;
    }
}