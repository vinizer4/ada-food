import mongoose from 'mongoose';

export class MongoConnection {
    static async connect() {
        try {
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/registerServiceDB');
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB', error);
            process.exit(1);
        }
    }
}
