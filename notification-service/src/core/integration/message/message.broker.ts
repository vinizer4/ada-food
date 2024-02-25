export interface MessageBroker {
    connect(): Promise<void>;
    consume(queueName: string, callback: (message: string) => Promise<void>): Promise<void>;
}