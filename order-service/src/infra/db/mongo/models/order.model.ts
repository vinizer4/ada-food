import mongoose, {Schema, Document} from "mongoose";
import {v4 as uuidv4} from "uuid";

interface OrderDocument extends Document {
    id: string;
    userId: string;
    addressId: string;
    description: string;
}

const orderSchema = new Schema<OrderDocument>({
    id: {type: String, default: uuidv4},
    userId: {type: String, required: true},
    addressId: {type: String, required: true},
    description: {type: String, required: true},
}, {timestamps: true});

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);

export default OrderModel;