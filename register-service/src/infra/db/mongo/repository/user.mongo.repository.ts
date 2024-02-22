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
        try {
            const user = await UserModel.findOne({ id });
            return user ? user.toObject() : null
        } catch (error) {
            console.error("[UserMongoRepository] Erro ao buscar usuário por id no banco:", error);
            throw new DatabaseOperationException("Falha ao buscar usuário por id no banco de dados MongoDb.");
        }
    }

    async findUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await UserModel.findOne({ email });
            return user ? user.toObject() : null;
        } catch (error) {
            console.error("[UserMongoRepository] Erro ao buscar usuário por email no banco:", error);
            throw new DatabaseOperationException("Falha ao buscar usuário por email no banco de dados MongoDb.");
        }
    }

    async updateUser(id: string, user: User): Promise<void> {
        try {
            const userData = user.toUpdateObjectMapper();
            await UserModel.findByIdAndUpdate(id, userData);
        } catch (error) {
            console.error("[UserMongoRepository] Erro ao atualizar usuário no banco:", error);
            throw new DatabaseOperationException("Falha ao atualizar usuário no banco de dados MongoDb.");
        }

    }

    async deleteUser(id: string): Promise<void> {
        try {
            await UserModel.findByIdAndDelete(id);
        } catch (error) {
            console.error("[UserMongoRepository] Erro ao deletar usuário no banco:", error);
            throw new DatabaseOperationException("Falha ao deletar usuário no banco de dados MongoDb.");
        }
    }
}
