import { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import {GlobalExceptionHandler} from "./exception/global.exception.handler";

export class ExpressMiddlewareConfig {
    private app: Express;

    constructor(app: Express) {
        this.app = app;
    }

    public initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
    }
}