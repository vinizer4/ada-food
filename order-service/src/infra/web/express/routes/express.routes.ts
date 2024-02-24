import {Express} from "express";
import {OrderController} from "../controller/order.controller";

export class ExpressRouteConfig {
    private app: Express;
    private orderController: OrderController;

    constructor(app: Express) {
        this.app = app;
        this.orderController = OrderController.getInstance();
    }

    public initializeRoutes(): void {
        this.app.get('/health', (req, res) => {
            res.status(200).send('Express register server is up and running');
        });
        this.app.post('/order', OrderController.getInstance().createOrder.bind(OrderController.getInstance()));
        this.app.get('/order/:id', OrderController.getInstance().findOrder.bind(OrderController.getInstance()));
        this.app.get('/order/user/:userId', OrderController.getInstance().findOrderByUser.bind(OrderController.getInstance()));
    }
}
