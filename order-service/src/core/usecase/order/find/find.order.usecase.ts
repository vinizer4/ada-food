import {OrderRepository} from "../../../application/repository/order/order.repository";
import {FindOrderUsecaseOutput} from "./output/find.order.usecase.output";
import {Order} from "../../../domain/order/entity/order";
import {ResourceNotfoundException} from "../../../exception/resource.notfound.exception";
import {FindOrderUsecaseInput} from "./input/find.order.usecase.input";

export class FindOrderUsecase {
    private static instance: FindOrderUsecase;
    private orderRepository: OrderRepository;

    private constructor(
        orderRepository: OrderRepository
    ) {
        this.orderRepository = orderRepository;
    }

    public static getInstance(
        orderRepository: OrderRepository
    ): FindOrderUsecase {
        if (!FindOrderUsecase.instance) {
            FindOrderUsecase.instance =
                new FindOrderUsecase(
                    orderRepository
                );
        }
        return FindOrderUsecase.instance;
    }

    public async execute(input: FindOrderUsecaseInput): Promise<FindOrderUsecaseOutput> {
        try {
            console.log("[FindOrderUsecase] - Buscando pedido com id: ", input.id);
            const order = await this.orderRepository.findOrderById(input.id);

            const validOrder = this.validOrder(order, input);
            console.log("[FindOrderUsecase] - Pedido encontrado: ", order);

            return this.toOutputMapper(validOrder);
        } catch (error: any) {
            throw this.exceptionHandler(error);
        }
    }

    private validOrder(
        order: Order | null,
        input: FindOrderUsecaseInput
    ): Order {
        if (!order) {
            console.error("[FindOrderUsecase] - Pedido não encontrado com id: ", input.id);
            throw new ResourceNotfoundException("Pedido não encontrado");
        }
        return order;
    }

    private exceptionHandler(error: any): Error {
        if (error instanceof ResourceNotfoundException) {
            return  error;
        }
        console.error("[FindOrderUsecase] - Erro na execução do usecase de busca de pedido: ", error);
        return new Error("Erro na busca de pedido");
    }

    private toOutputMapper(order: Order): FindOrderUsecaseOutput {
        return {
            id: order.id,
            userId: order.userId,
            addressId: order.addressId,
            description: order.description
        };
    }

}