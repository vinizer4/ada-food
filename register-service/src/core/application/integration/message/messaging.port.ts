export interface MessagingIntegrationPort {
    sendMessage(queue: string, message: string): Promise<void>;
}