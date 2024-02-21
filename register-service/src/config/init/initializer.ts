import {UserRepositoryAdapter} from "../adapters/db/database.adapter";
import {UserRepository} from "../../core/application/user/repository/user.repository.interface";
import dotenv from "dotenv";

export class Initializer {
    static initialize() {
        UserRepositoryAdapter.createUserRepository();
    }
}
