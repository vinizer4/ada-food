import {UserRepository} from "../../../../core/application/user/repository/user.repository.interface";
import User from "../../../../core/domain/user/entity/user";
import UserModel from "../models/user.model";
import {DatabaseOperationException} from "../../../../core/exception/database.operation.exception";

export class UserMongoRepository implements UserRepository {
    private static instance: UserMongoRepository;

    private constructor() {
    }

    public static getInstance(): UserMongoRepository {
        if (!UserMongoRepository.instance) {
            UserMongoRepository.instance = new UserMongoRepository();
        }
        return UserMongoRepository.instance;
    }

    async createUser(user: User): Promise<User> {
        try {
            const userToSave = user.toSaveObjectMapper()

            const createdUser = await UserModel.create(userToSave);
            return createdUser.toObject();
        } catch (error) {
            console.error("[UserMongoRepository] Erro ao criar usuário no banco:", error);
            throw new DatabaseOperationException("Falha ao criar usuário no banco de dados MongoDb.");
        }
    }


    async findUserById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id);
        return user ? user.toObject() : null;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email });
        return user ? user.toObject() : null;
    }

    async updateUser(id: string, user: User): Promise<void> {
        const userData = user.toUpdateObjectMapper();
        await UserModel.findByIdAndUpdate(id, userData);
    }

    async deleteUser(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id);
    }
}
