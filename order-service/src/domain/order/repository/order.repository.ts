import {Order} from "../entity/order";

export interface OrderRepository {
    save(order: Order): Promise<void>;
    getById(id: string): Promise<Order>;
}