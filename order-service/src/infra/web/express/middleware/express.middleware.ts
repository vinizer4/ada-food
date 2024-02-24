import { Express } from 'express';
import bodyParser from 'body-parser';

export class ExpressMiddlewareConfig {
    private app: Express;

    constructor(app: Express) {
        this.app = app;
    }

    public initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
    }
}