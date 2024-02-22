import mongoose, {Schema, Document} from "mongoose";
import { v4 as uuidv4 } from 'uuid';

interface AddressDocument extends Document {
    id: string;
    userId: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    cep: number;
}

const AddressSchema = new Schema(
    {
        id: { type: String, default: uuidv4 },
        userId: { type: String, required: true },
        street: { type: String, required: true },
        number: { type: String, required: true },
        neighborhood: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        cep: { type: Number, required: true }
    },
    { timestamps: true }
);

const AddressModel = mongoose.model<AddressDocument>('Address', AddressSchema);

export default AddressModel;