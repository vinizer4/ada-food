import {MessageBroker} from "../../../../core/integration/message/message.broker";
import amqp from 'amqplib';
import {IntegrationException} from "../../../../core/exception/integration.exception";

export class RabbitmqMessageBroker implements MessageBroker {
    private connection: amqp.Connection | null = null;
    private channel: amqp.Channel | null = null;

    constructor(private uri: string) {}

    async connect(): Promise<void> {
        try {
            console.log("Connecting to RabbitMQ");
            this.connection = await amqp.connect(this.uri);
            this.channel = await this.connection.createChannel();

            await this.channel.assertQueue("order-notification", { durable: true });
            await this.channel.assertQueue("user-register-email-notification", { durable: true });
        } catch (error) {
            console.error("Error connecting to RabbitMQ", error);
            throw new IntegrationException("Error connecting to RabbitMQ")
        }
    }

    async consume(queueName: string, callback: (message: string) => Promise<void>): Promise<void> {
        if (!this.channel) {
            throw new IntegrationException('Channel not initialized');
        }
        const channel = this.channel;
        await channel.assertQueue(queueName, { durable: true });
        await channel.consume(queueName, async (msg) => {
            if (msg) {
                try {
                    await callback(msg.content.toString());
                    channel.ack(msg);
                } catch (error) {
                    console.error('Error processing message: ', error);

                    const reenqueueOnFailure = process.env.RABBITMQ_REENQUEUE_ON_FAILURE === 'true';
                    channel.nack(msg, false, reenqueueOnFailure);
                }
            }
        });
    }
}