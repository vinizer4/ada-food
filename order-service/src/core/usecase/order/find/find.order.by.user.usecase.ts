import {OrderRepository} from "../../../application/repository/order/order.repository";
import {FindOrderUsecaseOutput} from "./output/find.order.usecase.output";
import {FindOrderUsecaseByUserIdInput} from "./input/find.order.usecase.input";
import {Order} from "../../../domain/order/entity/order";
import {ResourceNotfoundException} from "../../../exception/resource.notfound.exception";

export class FindOrderByUserUsecase {
    private static instance: FindOrderByUserUsecase;
    private orderRepository: OrderRepository;

    private constructor(
        orderRepository: OrderRepository
    ) {
        this.orderRepository = orderRepository;
    }

    public static getInstance(orderRepository: OrderRepository): FindOrderByUserUsecase {
        if (!this.instance) {
            this.instance = new FindOrderByUserUsecase(orderRepository);
        }
        return this.instance;
    }

    public async execute(input: FindOrderUsecaseByUserIdInput): Promise<FindOrderUsecaseOutput[]> {
        try {
            console.log("[FindOrderByUserUsecase] - Buscando pedidos do usuário com id: ", input.userId);
            const orders = await this.orderRepository.findOrdersByUserId(input.userId);

            const validOrders = this.validOrders(orders, input);

            console.log("[FindOrderByUserUsecase] - Pedidos encontrados: ", orders);

            return this.toOutputMapper(validOrders);
        } catch (error: any) {
            throw this.exceptionHandler(error);
        }
    }

    private validOrders(
        orders: Order[] | null,
        input: FindOrderUsecaseByUserIdInput
    ) {
        if (!orders) {
            console.error("[FindOrderByUserUsecase] - Pedidos não encontrados para o usuário com id: ", input.userId);
            throw new ResourceNotfoundException("Pedidos não encontrados");
        }
        return orders;
    }

    private exceptionHandler(error: any): Error {
        if (error instanceof ResourceNotfoundException) {
            return  error;
        }
        console.error("[FindOrderByUserUsecase] - Erro na execução do usecase de busca de pedidos: ", error);
        return new Error("Erro na busca de pedidos");
    }

    private toOutputMapper(orders: Order[]): FindOrderUsecaseOutput[] {
        return orders.map((order) => {
            return {
                id: order.id,
                userId: order.userId,
                addressId: order.addressId,
                description: order.description,
            }
        });
    }
}