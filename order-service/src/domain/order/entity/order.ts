export class Order {
    private id: string;
    private userId: string;
    private addressId: string;

    private constructor(id: string, userId: string, addressId: string) {
        this.id = id;
        this.userId = userId;
        this.addressId = addressId;
    }

    static create(id: string, userId: string, addressId: string) {
        return new Order(id, userId, addressId);
    }
}