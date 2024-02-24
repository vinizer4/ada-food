import {Express} from "express";
import {UserController} from "../controller/user/user.controller";

export class ExpressRouteConfig {
    private app: Express;
    private readonly userController: UserController;

    constructor(app: Express) {
        this.app = app;
        this.userController = UserController.getInstance();
    }

    public initializeRoutes(): void {
        this.app.post('/register/userwithaddress', this.userController.createUserWithAddress.bind(this.userController));
        this.app.post('/register/user', this.userController.createUser.bind(this.userController));
        this.app.get('/user/email', this.userController.findUserByEmail.bind(this.userController));
        this.app.get('/userwithaddress/:id', this.userController.findUserWithAddress.bind(this.userController));
        this.app.get('/user/:id', this.userController.findUserById.bind(this.userController));
        this.app.put('/user', this.userController.updateUser.bind(this.userController));
        this.app.delete('/user/:id', this.userController.deleteUser.bind(this.userController));
    }
}
