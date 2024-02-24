import {OrderRepository} from "../../../core/application/user/repository/order.repository";
import {OrderMongoRepository} from "../../../infra/db/mongo/repository/order.mongo.repository";

export class DataBaseAdapter {
    private static orderRepository: OrderRepository;

    static getUserRepository(): OrderRepository {
        if (!this.orderRepository) {
            throw new Error("Initializer not run.");
        }
        return this.orderRepository;
    }

    static createUserRepository() {
        if (process.env.DB_TYPE === 'mongo') {
            this.orderRepository = OrderMongoRepository.getInstance();
        } else {
            throw new Error('Invalid database');
        }
    }
}