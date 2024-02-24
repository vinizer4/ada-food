import {OrderRepository} from "../../../../core/application/repository/order/order.repository";
import {DatabaseOperationException} from "../../../../core/exception/database.operation.exception";
import OrderModel from "../models/order.model";
import {Order} from "../../../../core/domain/order/entity/order";

export class OrderMongoRepository implements OrderRepository {
    private static instance: OrderMongoRepository;

    private constructor() {
    }

    public static getInstance(): OrderMongoRepository {
        if (!OrderMongoRepository.instance) {
            OrderMongoRepository.instance = new OrderMongoRepository();
        }
        return OrderMongoRepository.instance;
    }


    async createOrder(order: Order): Promise<Order> {
        try {
            const orderToSave = order.toSaveObjectMapper()

            const createdOrder = await OrderModel.create(orderToSave);
            return createdOrder.toObject();
        } catch (error) {
            console.error("[OrderMongoRepository] Erro ao criar pedido no banco:", error);
            throw new DatabaseOperationException("Falha ao criar pedido no banco de dados MongoDb.");
        }
    }

    async findOrderById(id: string): Promise<Order | null> {
        try {
            const order = await OrderModel.findOne({ id });
            return order ? order.toObject() : null
        } catch (error) {
            console.error("[OrderMongoRepository] Erro ao buscar pedido por id no banco:", error);
            throw new DatabaseOperationException("Falha ao buscar pedido por id no banco de dados MongoDb.");
        }
    }

    async findOrdersByUserId(userId: string): Promise<Order[] | null> {
        try {
            const orders = await OrderModel.find({ userId });
            return orders.map(order => order.toObject());
        } catch (error) {
            console.error("[OrderMongoRepository] Erro ao buscar pedidos por id do usuário no banco:", error);
            throw new DatabaseOperationException("Falha ao buscar pedidos por id do usuário no banco de dados MongoDb.");
        }
    }
}