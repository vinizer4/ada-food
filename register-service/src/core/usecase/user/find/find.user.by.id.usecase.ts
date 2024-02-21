import {UserRepository} from "../../../application/user/repository/user.repository.interface";
import {UserFactory} from "../../../domain/user/factory/user.factory";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";
import {FindUserOutputUsecase} from "./output/find.output.usecase";
import {FindByIdInputUsecase} from "./input/find.input.usecase";
import {ResourceNotfoundException} from "../../../exception/resource.notfound.exception";

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

    async execute(input: FindByIdInputUsecase): Promise<FindUserOutputUsecase> {
        try {
            console.log("[UpdateUserUsecase] - Buscando usuário com id: ", input.id);

            const user = await this.userRepository.findUserById(input.id);

            if (!user) {
                console.error("[UpdateUserUsecase] - Usuário não encontrado com id: ", input.id);
                throw new ResourceNotfoundException("Usuário não encontrado");
            }

            console.log("[UpdateUserUsecase] - Usuário buscado com sucesso: ", user);

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf
            }
        } catch (error: any) {
            console.error("[UpdateUserUsecase] - Erro na execução do usecase de update de usuário: ", error);
            throw new UsecaseExecutionException("Erro na atualização de usuário");
        }
    }
}