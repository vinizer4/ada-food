import {CreateOrderUsecase} from "../../../../core/usecase/order/create/create.order.usecase";
import {FindOrderUsecase} from "../../../../core/usecase/order/find/find.order.usecase";
import {FindOrderByUserUsecase} from "../../../../core/usecase/order/find/find.order.by.user.usecase";
import {DataBaseAdapter} from "../../../../config/adapters/db/database.adapter";
import {MessageBrokerAdapter} from "../../../../config/adapters/message/messagerind.adapter";
import { Request, Response } from 'express';
import {GlobalExceptionHandler} from "../middleware/exception/global.exception.handler";

export class OrderController {
    private static instance: OrderController;

    private createOrderUsecase: CreateOrderUsecase;
    private findOrderUsecase: FindOrderUsecase;
    private findOrderByUserUsecase: FindOrderByUserUsecase;

    private constructor() {
        this.createOrderUsecase = CreateOrderUsecase.getInstance(
            DataBaseAdapter.getOrderRepository(),
            MessageBrokerAdapter.getMessagerindAdapter()
        )
        this.findOrderUsecase = FindOrderUsecase.getInstance(
            DataBaseAdapter.getOrderRepository()
        );
        this.findOrderByUserUsecase = FindOrderByUserUsecase.getInstance(
            DataBaseAdapter.getOrderRepository()
        );
    }

    static getInstance(): OrderController {
        if (!this.instance) {
            this.instance = new OrderController();
        }
        return this.instance;
    }

    async createOrder(req: Request, res: Response) {
        try {
            const order = req.body
            const createdOrder = await this.createOrderUsecase.execute(order);
            res.status(201).json(createdOrder);
        } catch (error: any) {
            GlobalExceptionHandler.handleError(error, req, res);
        }
    }

    async findOrder(req: Request, res: Response) {
        try {
            const input = {
                id: req.params.id
            }
            const order = await this.findOrderUsecase.execute(input);
            res.status(200).json(order);
        } catch (error: any) {
            GlobalExceptionHandler.handleError(error, req, res);
        }
    }

    async findOrderByUser(req: Request, res: Response) {
        try {
            const input = {
                userId: req.params.userId
            }
            const orders = await this.findOrderByUserUsecase.execute(input);
            res.status(200).json(orders);
        } catch (error: any) {
            GlobalExceptionHandler.handleError(error, req, res);
        }
    }
}