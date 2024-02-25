import {Order} from "../../../domain/order/entity/order";

export interface OrderRepository {
    createOrder(order: Order): Promise<Order>;
    findOrderById(id: string): Promise<Order | null>;
    findOrdersByUserId(userId: string): Promise<Order[] | null>;
}