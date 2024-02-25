export interface MessagingBroker {
    connect(): Promise<void>;
    sendMessage(queue: string, message: string): Promise<void>;
}