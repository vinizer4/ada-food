export interface MessageBroker {
    consume(queueName: string, callback: (message: string) => Promise<void>): Promise<void>;
}