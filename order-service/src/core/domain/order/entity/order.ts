import { v4 as uuidV4 } from 'uuid';
import {Error} from "mongoose";

export class Order {
    private _id: string;
    private _userId: string;
    private _addressId: string;
    private _description: string;

    private constructor(userId: string, addressId: string, description: string) {
        this._id = uuidV4();
        this._userId = userId;
        this._addressId = addressId;
        this._description = description;
        this.validate();
    }

    private validate() {
        if (this._description.length === 0) {
            throw new Error('Description is required');
        }
        if (this._userId.length === 0) {
            throw new Error('User is required');
        }
        if (this._addressId.length === 0) {
            throw new Error('Address is required');
        }
    }

    static create(userId: string, addressId: string, description: string) {
        return new Order(userId, addressId, description);
    }

    static createWithId(id: string, userId: string, addressId: string, description: string) {
        const order = new Order(userId, addressId, description);
        order._id = id;
        return order;
    }

    toSaveObjectMapper() {
        return {
            userId: this._userId,
            addressId: this._addressId,
            description: this._description
        };
    }


    get id(): string {
        return this._id;
    }

    get userId(): string {
        return this._userId;
    }

    get addressId(): string {
        return this._addressId;
    }

    get description(): string {
        return this._description;
    }
}