import {Order} from "../entity/order";

export interface OrderRepository {
    createOrder(order: Order): Promise<Order>;
    findOrderById(id: string): Promise<Order | null>;
}