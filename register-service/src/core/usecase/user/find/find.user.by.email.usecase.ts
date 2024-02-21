import {UserRepository} from "../../../application/user/repository/user.repository.interface";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";
import {FindUserOutputUsecase} from "./output/find.output.usecase";
import {FindByEmailInputUsecase} from "./input/find.input.usecase";
import {ResourceNotfoundException} from "../../../exception/resource.notfound.exception";

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

    async execute(input: FindByEmailInputUsecase): Promise<FindUserOutputUsecase> {
        try {
            console.log("[FindUserByEmailUseCase] - Buscando usuário por email: ", input.email);

            const user = await this.userRepository.findUserByEmail(input.email);

            if (!user) {
                console.error("[FindUserByEmailUseCase] - Usuário não encontrado com email: ", input.email);
                throw new ResourceNotfoundException("Usuário não encontrado");
            }

            console.log("[FindUserByEmailUseCase] - Usuário buscado com sucesso: ", user);

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf
            }
        } catch (error: any) {
            console.error("[FindUserByEmailUseCase] - Erro na execução do usecase de update de usuário: ", error);
            throw new UsecaseExecutionException("Erro na atualização de usuário");
        }
    }
}