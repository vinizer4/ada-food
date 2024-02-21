import * as amqp from 'amqplib';
import {MessagingIntegrationPort} from "../../../../core/application/integration/message/messaging.port";

export class RabbitMQAdapter implements MessagingIntegrationPort {
    private connection: amqp.Connection | null = null;
    private channel: amqp.Channel | null = null;

    constructor(private uri: string) {}

    async connect(): Promise<void> {
        this.connection = await amqp.connect(this.uri);
        this.channel = await this.connection.createChannel();
    }

    async sendMessage(queue: string, message: string): Promise<void> {
        if (!this.channel) {
            throw new Error("Channel not initialized");
        }
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, Buffer.from(message));
    }
}
