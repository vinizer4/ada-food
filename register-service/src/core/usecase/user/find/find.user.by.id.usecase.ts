import {UserRepository} from "../../../application/user/repository/user.repository.interface";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";
import {FindUserOutputUsecase} from "./output/find.output.usecase";
import {FindUserByIdInputUsecase} from "./input/find.input.usecase";
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

    async execute(input: FindUserByIdInputUsecase): Promise<FindUserOutputUsecase> {
        try {
            console.log("[FindUserByIdUseCase] - Buscando usuário com id: ", input.id);

            const user = await this.userRepository.findUserById(input.id);

            if (!user) {
                console.error("[FindUserByIdUseCase] - Usuário não encontrado com id: ", input.id);
                throw new ResourceNotfoundException("Usuário não encontrado");
            }

            console.log("[FindUserByIdUseCase] - Usuário buscado com sucesso: ", user);

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf
            }
        }
        catch (error: any) {
            if (error instanceof ResourceNotfoundException) {
                throw error;
            }
            console.error("[FindUserByIdUseCase] - Erro na execução do usecase de busca de usuário: ", error);
            throw new UsecaseExecutionException("Erro na busca de usuário");
        }
    }
}