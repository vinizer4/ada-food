import {MessagerindAdapter} from "../adapters/message/messagerind.adapter";
import {DataBaseAdapter} from "../adapters/db/database.adapter";

export class Initializer {
    static async initialize() {
        DataBaseAdapter.createUserRepository();

        MessagerindAdapter.createMessagerindAdapter();
        const messagerindAdapter = MessagerindAdapter.getMessagerindAdapter();
        await messagerindAdapter.connect();
    }
}
