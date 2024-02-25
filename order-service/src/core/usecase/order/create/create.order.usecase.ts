import {CreateOrderUsecaseInput} from "./input/create.order.usecase.input";
import {OrderRepository} from "../../../application/repository/order/order.repository";
import {OrderFactory} from "../../../domain/order/factory/order.factory";
import {MessagingBroker} from "../../../application/integration/message/messaging.port";
import {Order} from "../../../domain/order/entity/order";
import {UsecaseExecutionException} from "../../../exception/usecase.execution.exception";
import {CreateOrderUsecaseOutput} from "./output/create.order.usecase.output";
import {
    FindAddressApiOutput,
    FindUserWithAddressApiOutput,
    RegisterApiIntegration
} from "../../../application/integration/api/register/register.api.integration";
import {ResourceNotfoundException} from "../../../exception/resource.notfound.exception";
import {IntegrationException} from "../../../exception/integration.exception";

export class CreateOrderUsecase {
    private static instance: CreateOrderUsecase;
    private orderRepository: OrderRepository;
    private messagingBroker: MessagingBroker;
    private registerApiIntegration: RegisterApiIntegration;

    private constructor(
        orderRepository: OrderRepository,
        messagingBroker: MessagingBroker,
        registerApiIntegration: RegisterApiIntegration
    ) {
        this.orderRepository = orderRepository;
        this.messagingBroker = messagingBroker;
        this.registerApiIntegration = registerApiIntegration;

    }

    public static getInstance(
        orderRepository: OrderRepository,
        messagingBroker: MessagingBroker,
        registerApiIntegration: RegisterApiIntegration
    ): CreateOrderUsecase {
        if (!CreateOrderUsecase.instance) {
            CreateOrderUsecase.instance =
                new CreateOrderUsecase(
                    orderRepository,
                    messagingBroker,
                    registerApiIntegration
                );
        }
        return CreateOrderUsecase.instance;
    }

    public async execute(input: CreateOrderUsecaseInput): Promise<CreateOrderUsecaseOutput> {
        try {
            console.log("[CreateOrderUsecase] - Criando pedido com input: ", input);
            const user : FindUserWithAddressApiOutput = await this.getUserAndAddressByUserId(input.userId);
            const address = await this.validIsValidAddress(input, user.address);
            const order = this.createOrderEntity(input);

            const orderCreated = await this.persistOrder(order);
            console.log("[CreateOrderUsecase] - Pedido criado com sucesso: ", orderCreated);

            const output = this.mapperOrderToOutput(order);

            const message = this.mapperToMessage(order, user, address);

            await this.sendEmailNotification(message);

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

    private mapperToMessage(order: Order, User: FindUserWithAddressApiOutput, Address: FindAddressApiOutput): string {
        return JSON.stringify({
            id: order.id,
            userId: order.userId,
            addressId: order.addressId,
            description: order.description,
            user: {
                id: User.id,
                name: User.name,
                email: User.email,
                cpf: User.cpf
            },
            address: {
                id: Address.id,
                street: Address.street,
                number: Address.number,
                neighborhood: Address.neighborhood,
                city: Address.city,
                state: Address.state,
                country: Address.country,
                cep: Address.cep
            }
        });
    }

    private async sendEmailNotification(message: string): Promise<void> {
        await this.messagingBroker.sendMessage("order-notification", message);
    }

    private exceptionHandler(error: any) {
        if (error instanceof ResourceNotfoundException || error instanceof IntegrationException) {
            return error;
        }
        console.error("[CreateOrderUsecase] - Erro na execução do usecase de criação de pedido: ", error);
        return new UsecaseExecutionException("Erro na criação de pedido");
    }

    private getUserAndAddressByUserId(userId: string): Promise<FindUserWithAddressApiOutput> {
        try {
            const user = this.registerApiIntegration.findUserAndAddressByUserId(userId);
            return user;
        } catch (error) {
            if (error instanceof ResourceNotfoundException || error instanceof IntegrationException) {
                throw error;
            }
            console.error("[FindUserByIdUseCase] - Erro na busca de usuário: ", error);
            throw new IntegrationException("Erro na busca de usuário");
        }
    }

    private async validIsValidAddress(input: CreateOrderUsecaseInput, address: FindAddressApiOutput[]) : Promise<FindAddressApiOutput> {
        if (!input.addressId) {
            console.error("[CreateOrderUsecase] - Nem um endereço foi informado");
            throw new UsecaseExecutionException("Nem um endereço foi informado");
        }

        if (!address) {
            console.error("[CreateOrderUsecase] - Endereço não encontrado");
            throw new ResourceNotfoundException("Endereço não encontrado");
        }

        const addressFound = address.find(address => address.id === input.addressId);
        if (!addressFound) {
            console.error("[CreateOrderUsecase] - Endereço não encontrado");
            throw new ResourceNotfoundException("Endereço não encontrado");
        }
        return addressFound;
    }
}