import {Order} from "../entity/order";

export class OrderFactory {
    static create(id: string, userId: string, addressId: string) {
        const order = Order.create(id, userId, addressId);
        return order;
    }
}