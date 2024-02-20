import express, { Express } from 'express';
import bodyParser from 'body-parser';

export class ExpressApp {
    public app: Express;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
    }

    private initializeRoutes(): void {
    }

    public listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Express register server listening on port ${port}`);
        });
    }
}