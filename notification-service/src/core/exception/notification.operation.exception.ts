export class NotificationOperationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotificationOperationException";
    }
}