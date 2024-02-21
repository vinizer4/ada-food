import * as amqp from 'amqplib';
import {
    MessagingBroker
} from "../../../../core/application/integration/message/messaging.port";
import {IntegrationException} from "../../../../core/exception/integration.exception";

export class RabbitMQAdapter implements MessagingBroker {
    private connection: amqp.Connection | null = null;
    private channel: amqp.Channel | null = null;

    constructor(private uri: string) {}

    async connect(): Promise<void> {
        try {
            console.log("Connecting to RabbitMQ");
            this.connection = await amqp.connect(this.uri);
            this.channel = await this.connection.createChannel();

            await this.channel.assertQueue("user-register-email-notification", { durable: true });
        } catch (error) {
            console.error("Error connecting to RabbitMQ", error);
            throw new IntegrationException("Error connecting to RabbitMQ")
        }

    }

    async sendMessage(queue: string, message: string): Promise<void> {
        if (!this.channel) {
            throw new Error("Channel not initialized");
        }
        console.log(`Sending message: ${message} to queue: ${queue} `);
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, Buffer.from(message));
    }
}
