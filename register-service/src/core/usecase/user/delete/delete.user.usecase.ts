import {UserRepository} from "../../../application/user/repository/user.repository.interface";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";
import {DeleteUserInputUsecase} from "./input/delete.input.usecase";

export class DeleteUserUseCase {
    private static instance: DeleteUserUseCase;
    private readonly userRepository: UserRepository;

    private constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public static getInstance(userRepository: UserRepository): DeleteUserUseCase {
        if (!DeleteUserUseCase.instance) {
            DeleteUserUseCase.instance = new DeleteUserUseCase(userRepository);
        }
        return DeleteUserUseCase.instance;
    }

    async execute(input: DeleteUserInputUsecase): Promise<void> {
        try {
            console.log("[DeleteUserInputUsecase] - Deletando usuário com id: ", input.id);

            await this.userRepository.deleteUser(input.id);

            console.log(`[DeleteUserInputUsecase] - Usuário com id:${input.id} deletado com sucesso`);

            return
        } catch (error: any) {
            console.error("[DeleteUserInputUsecase] - Erro na execução do usecase de update de usuário: ", error);
            throw new UsecaseExecutionException("Erro na atualização de usuário");
        }
    }
}