export class Order {
    private id: string;
    private userId: string;
    private addressId: string;
    private description: string;

    private constructor(id: string, userId: string, addressId: string, description: string) {
        this.id = id;
        this.userId = userId;
        this.addressId = addressId;
        this.description = description;
    }

    static create(id: string, userId: string, addressId: string, description: string) {
        return new Order(id, userId, addressId, description);
    }
}