import {OrderRepository} from "../../../core/application/repository/order/order.repository";
import {OrderMongoRepository} from "../../../infra/db/mongo/repository/order.mongo.repository";
import {MongoConnection} from "../../../infra/db/mongo/config/mongo-connection";

export class DataBaseAdapter {
    private static orderRepository: OrderRepository;

    static getDataBaseAdapter(): OrderRepository {
        if (!this.orderRepository) {
            throw new Error("Initializer not run.");
        }
        return this.orderRepository;
    }

    static async createUserRepository() {
        if (process.env.DB_TYPE === 'mongo') {
            await MongoConnection.connect();
            this.orderRepository = OrderMongoRepository.getInstance();
        } else {
            throw new Error('Invalid database');
        }
    }


}