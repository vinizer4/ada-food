import {UserRepository} from "../../../core/application/user/repository/user.repository.interface";
import {UserMongoRepository} from "../../../infra/db/mongo/repository/user.mongo.repository";

export class UserRepositoryAdapter {
    static createUserRepository(): UserRepository {
        if (process.env.DB === 'mongo') {
            return UserMongoRepository.getInstance();
        } else {
            throw new Error('Invalid database');
        }
    }
}

export const userRepository = UserRepositoryAdapter.createUserRepository();