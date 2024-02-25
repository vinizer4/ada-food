import {CreateOrderUsecaseInput} from "./input/create.order.usecase.input";
import {OrderRepository} from "../../../application/repository/order/order.repository";
import {OrderFactory} from "../../../domain/order/factory/order.factory";
import {MessagingBroker} from "../../../application/integration/message/messaging.port";
import {Order} from "../../../domain/order/entity/order";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";
import {CreateOrderUsecaseOutput} from "./output/create.order.usecase.output";

export class CreateOrderUsecase {
    private static instance: CreateOrderUsecase;
    private orderRepository: OrderRepository;
    private messagingBroker: MessagingBroker;

    private constructor(
        orderRepository: OrderRepository,
        messagingBroker: MessagingBroker) {
        this.orderRepository = orderRepository;
        this.messagingBroker = messagingBroker;
    }

    public static getInstance(
        orderRepository: OrderRepository,
        messagingBroker: MessagingBroker
    ): CreateOrderUsecase {
        if (!CreateOrderUsecase.instance) {
            CreateOrderUsecase.instance =
                new CreateOrderUsecase(
                    orderRepository,
                    messagingBroker
                );
        }
        return CreateOrderUsecase.instance;
    }

    public async execute(input: CreateOrderUsecaseInput): Promise<CreateOrderUsecaseOutput> {
        try {
            console.log("[CreateOrderUsecase] - Criando pedido com input: ", input);
            const order = this.createOrderEntity(input);

            const orderCreated = await this.persistOrder(order);
            console.log("[CreateOrderUsecase] - Pedido criado com sucesso: ", orderCreated);

            const output = this.mapperOrderToOutput(order);

            await this.sendEmailNotification(output);

            return output;
        } catch (error: any) {
            throw this.exceptionHandler(error);
        }
    }

    private createOrderEntity(input: CreateOrderUsecaseInput) : Order {
        return OrderFactory.create(input.userId, input.addressId, input.description);
    }

    private async persistOrder(order: Order): Promise<void> {
        await this.orderRepository.createOrder(order);
    }

    private mapperOrderToOutput(order: Order): CreateOrderUsecaseOutput {
        return {
            id: order.id,
            userId: order.userId,
            addressId: order.addressId,
            description: order.description
        }
    }

    private async sendEmailNotification(order: CreateOrderUsecaseOutput): Promise<void> {
        const message = JSON.stringify({
            id: order.id,
            userId: order.userId,
            addressId: order.addressId,
            description: order.description
        });
        await this.messagingBroker.sendMessage("order-notification", message);
    }

    private exceptionHandler(error: any) {
        console.error("[CreateOrderUsecase] - Erro na execução do usecase de criação de pedido: ", error);
        return new UsecaseExecutionException("Erro na criação de pedido");
    }
}