import User from "../entity/user";

export interface UserRepository {
    createUser(user: User): Promise<User>;

    findUserById(id: string): Promise<User | null>;

    findUserByEmail(email: string): Promise<User | null>;

    updateUser(id: string, user: User): Promise<void>;

    deleteUser(id: string): Promise<void>;
}