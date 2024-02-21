import {UserRepository} from "../../../core/application/user/repository/user.repository.interface";
import {UserMongoRepository} from "../../../infra/db/mongo/repository/user.mongo.repository";

export class UserRepositoryAdapter {
    private static userRepository: UserRepository;

    static getUserRepository(): UserRepository {
        if (!this.userRepository) {
            throw new Error("Initializer not run.");
        }
        return this.userRepository;
    }

    static createUserRepository() {
        if (process.env.DB_TYPE === 'mongo') {
            this.userRepository = UserMongoRepository.getInstance();
        } else {
            throw new Error('Invalid database');
        }
    }
}