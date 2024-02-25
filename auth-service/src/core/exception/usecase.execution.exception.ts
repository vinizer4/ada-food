export class UsecaseExecutionException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UsecaseExecutionException";
    }
}