import express, { Express } from 'express';
import {ExpressMiddlewareConfig} from "../middleware/express.middleware";
import {ExpressRouteConfig} from "../routes/express.routes";

export class ExpressConfig {
    readonly app: Express;

    constructor() {
        this.app = express();
        const middlewareConfig = new ExpressMiddlewareConfig(this.app);
        const routeConfig = new ExpressRouteConfig(this.app);

        middlewareConfig.initializeMiddlewares();
        routeConfig.initializeRoutes();
    }

    public listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Express register server listening on port ${port}`);
        });
    }
}
