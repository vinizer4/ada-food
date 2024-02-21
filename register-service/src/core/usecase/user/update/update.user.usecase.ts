import {UserRepository} from "../../../application/user/repository/user.repository.interface";
import {UserFactory} from "../../../domain/user/factory/user.factory";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";
import {UpdateUserInputUsecase} from "./input/update.user.input.usecase";

export class UpdateUserUsecase {
    private static instance: UpdateUserUsecase;
    private readonly userRepository: UserRepository;

    private constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public static getInstance(userRepository: UserRepository): UpdateUserUsecase {
        if (!UpdateUserUsecase.instance) {
            UpdateUserUsecase.instance = new UpdateUserUsecase(userRepository);
        }
        return UpdateUserUsecase.instance;
    }

    async execute(input: UpdateUserInputUsecase): Promise<void> {
        try {
            console.log("[UpdateUserUsecase] - Atualizando usuário com input: ", input);
            const user = UserFactory.create(input.name, input.email, input.cpf);

            await this.userRepository.updateUser(input.id, user);
            console.log("[UpdateUserUsecase] - Usuário atualizado com sucesso: ", user);

            return
        } catch (error: any) {
            console.error("[UpdateUserUsecase] - Erro na execução do usecase de update de usuário: ", error);
            throw new UsecaseExecutionException("Erro na atualização de usuário");
        }
    }
}