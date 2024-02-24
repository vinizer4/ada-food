import {Express} from "express";

export class ExpressRouteConfig {
    private app: Express;

    constructor(app: Express) {
        this.app = app;
    }

    public initializeRoutes(): void {
    }
}
