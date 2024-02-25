import {Express} from "express";
import {AuthController} from "../controller/auth.controller";

export class ExpressRouteConfig {
    private app: Express;
    private readonly authController: AuthController;

    constructor(app: Express) {
        this.app = app;
        this.authController = AuthController.getInstance();
    }

    public initializeRoutes(): void {
        this.app.get('/auth/loginwithemail', this.authController.loginWithEmail.bind(this.authController));
        this.app.get('/auth/verifytoken', this.authController.verifyToken.bind(this.authController));
    }
}
