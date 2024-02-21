import {UserRepositoryAdapter} from "../adapters/db/database.adapter";
import {CreateUserUsecase} from "../../core/usecase/user/create/create.user.usecase";
import {UpdateUserUsecase} from "../../core/usecase/user/update/update.user.usecase";
import {DeleteUserUseCase} from "../../core/usecase/user/delete/delete.user.usecase";
import {FindUserByIdUseCase} from "../../core/usecase/user/find/find.user.by.id.usecase";
import {FindUserByEmailUseCase} from "../../core/usecase/user/find/find.user.by.email.usecase";
import {MessagerindAdapter} from "../adapters/message/messagerind.adapter";

export class Initializer {
    static initialize() {
        UserRepositoryAdapter.createUserRepository();
        MessagerindAdapter.createMessagerindAdapter();
        CreateUserUsecase.getInstance(UserRepositoryAdapter.getUserRepository());
        UpdateUserUsecase.getInstance(UserRepositoryAdapter.getUserRepository());
        DeleteUserUseCase.getInstance(UserRepositoryAdapter.getUserRepository());
        FindUserByIdUseCase.getInstance(UserRepositoryAdapter.getUserRepository());
        FindUserByEmailUseCase.getInstance(UserRepositoryAdapter.getUserRepository());
    }
}
