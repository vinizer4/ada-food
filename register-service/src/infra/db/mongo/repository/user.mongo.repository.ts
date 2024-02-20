import {UserRepository} from "../../../../core/application/user/repository/user.repository.interface";
import User from "../../../../core/domain/user/entity/user";
import UserModel from "../models/user.model";

export class UserMongoRepository implements UserRepository {
    async createUser(user: User): Promise<User> {
        const createdUser = await UserModel.create(user);
        return createdUser.toObject();
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
