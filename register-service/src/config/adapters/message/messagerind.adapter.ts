import {MessagingIntegrationPort} from "../../../core/application/integration/message/messaging.port";
import {RabbitMQAdapter} from "../../../infra/integration/message/rabbitmq/rabbit.mq.adapter";

export class MessagerindAdapter {
    private static instance: MessagingIntegrationPort;

    static getMessagerindAdapter(): MessagingIntegrationPort {
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