import {MessagingBroker} from "../../../core/application/integration/message/message.broker";
import {RabbitMQAdapter} from "../../../infra/integration/message/rabbimq/rabbit.mq.adapter";

export class MessageBrokerAdapter {
    private static instance: MessagingBroker;

    static getMessagerindAdapter(): MessagingBroker {
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
            this.instance = new RabbitMQAdapter(rabbitmqUri);
        } else {
            throw new Error("Invalid message broker");
        }
    }
}