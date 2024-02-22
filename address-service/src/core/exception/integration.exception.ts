export class IntegrationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "IntegrationException";
    }
}