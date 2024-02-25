import {RabbitmqMessageBroker} from "../../../infra/integration/message/rabbitmq/rabbitmq.message.broker";
import {MessageBroker} from "../../../core/integration/message/message.broker";

export class MessageBrokerAdapter {
    private static instance: MessageBroker;

    static getMessagerindAdapter(): MessageBroker {
        if (!this.instance) {
            throw new Error("MessagerindAdapter not initialized");
        }
        return this.instance;
    }

    static createMessagerindAdapter() {
        if (process.env.MESSAGE_BROKER === 'rabbitmq') {
            const rabbitmqUri = process.env.RABBITMQ_URI;
            if (!rabbitmqUri) {
                throw new Error("RABBITMQ_URI not set");
            }
            this.instance = new RabbitmqMessageBroker(rabbitmqUri);
        } else {
            throw new Error("Invalid message broker");
        }
    }
}