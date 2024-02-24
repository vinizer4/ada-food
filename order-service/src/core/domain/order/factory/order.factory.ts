import {Order} from "../entity/order";

export class OrderFactory {
    static create(userId: string, addressId: string, description: string) {
        const order = Order.create(userId, addressId, description);
        return order;
    }

    static createWithId(id: string, userId: string, addressId: string, description: string) {
        const order = Order.createWithId(id, userId, addressId, description);
        return order;
    }
}