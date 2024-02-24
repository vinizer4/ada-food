import { v4 as uuidV4 } from 'uuid';

export class Order {
    private id: string;
    private userId: string;
    private addressId: string;
    private description: string;

    private constructor(userId: string, addressId: string, description: string) {
        this.id = uuidV4();
        this.userId = userId;
        this.addressId = addressId;
        this.description = description;
    }

    static create(userId: string, addressId: string, description: string) {
        return new Order(userId, addressId, description);
    }

    static createWithId(id: string, userId: string, addressId: string, description: string) {
        const order = new Order(userId, addressId, description);
        order.id = id;
        return order;
    }

    toSaveObjectMapper() {
        return {
            id: this.id,
            userId: this.userId,
            addressId: this.addressId,
            description: this.description
        };
    }

    getId() {
        return this.id;
    }

    getUserId() {
        return this.userId;
    }

    getAddressId() {
        return this.addressId;
    }

    getDescription() {
        return this.description;
    }
}