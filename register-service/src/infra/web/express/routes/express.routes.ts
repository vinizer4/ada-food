import {Express} from "express";
import {UserController} from "../controller/user/user.controller";

export class ExpressRouteConfig {
    private app: Express;
    private userController: UserController;

    constructor(app: Express) {
        this.app = app;
        this.userController = UserController.getInstance();
    }

    public initializeRoutes(): void {
        this.app.post('/register/user', this.userController.createUser);
    }
}