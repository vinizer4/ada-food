import Address from "../../address/entity/address";
import User from "../entity/user";

class UserFactory {
    static create(name: string, email: string, cpf: string): User {
        return User.createUser(name, email, cpf);
    }

    static createWithAddress(name: string, email: string, cpf: string, address: Address): User {
        const user = User.createUser(name, email, cpf);
        user.addAddress(address);
        return user;
    }
}
