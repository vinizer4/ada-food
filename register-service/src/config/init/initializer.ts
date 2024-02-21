import {UserRepositoryAdapter} from "../adapters/db/database.adapter";
import {CreateUserUseCase} from "../../core/usecase/user/create/createUserUseCase";

export class Initializer {
    static initialize() {
        UserRepositoryAdapter.createUserRepository();
        CreateUserUseCase.getInstance(UserRepositoryAdapter.getUserRepository());
    }
}
