export class ResourceNotfoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ResourceNotfoundException";
    }
}