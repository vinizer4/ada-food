import {UserRepositoryAdapter} from "../adapters/db/database.adapter";
import {CreateUserUsecase} from "../../core/usecase/user/create/create.user.usecase";

export class Initializer {
    static initialize() {
        UserRepositoryAdapter.createUserRepository();
        CreateUserUsecase.getInstance(UserRepositoryAdapter.getUserRepository());
    }
}
