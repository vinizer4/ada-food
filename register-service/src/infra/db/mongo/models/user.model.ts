import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface UserDocument extends Document {
    id: string;
    name: string;
    email: string;
    cpf: string;
}

const userSchema = new Schema<UserDocument>({
    id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cpf: { type: String, required: true, unique: true },
}, { timestamps: true });

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;

