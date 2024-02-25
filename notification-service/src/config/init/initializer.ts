import {MessageBrokerAdapter} from "../adapters/message/message.broker.adapter";

export class Initializer {
    static async initialize() {

        MessageBrokerAdapter.createMessagerindAdapter();
        const messageBrokerAdapter = MessageBrokerAdapter.getMessagerindAdapter();
        await messageBrokerAdapter.connect();
    }
}