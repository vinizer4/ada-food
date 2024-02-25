import {MessageBrokerAdapter} from "../adapters/message/messagerind.adapter";
import {DataBaseAdapter} from "../adapters/db/database.adapter";
import {CreateOrderUsecase} from "../../core/usecase/order/create/create.order.usecase";
import {FindOrderUsecase} from "../../core/usecase/order/find/find.order.usecase";
import {FindOrderByUserUsecase} from "../../core/usecase/order/find/find.order.by.user.usecase";
import {RegisterApiIntegrationImpl} from "../../infra/integration/api/register/register.api.integration.impl";

export class Initializer {
    static async initialize() {
        await DataBaseAdapter.createUserRepository();
        const dataBaseAdapter = DataBaseAdapter.getOrderRepository();
        const registerApi = RegisterApiIntegrationImpl.getInstance();

        MessageBrokerAdapter.createMessagerindAdapter();
        const messageBrokerAdapter = MessageBrokerAdapter.getMessagerindAdapter();
        await messageBrokerAdapter.connect();

        CreateOrderUsecase.getInstance(dataBaseAdapter, messageBrokerAdapter, registerApi);
        FindOrderUsecase.getInstance(dataBaseAdapter);
        FindOrderByUserUsecase.getInstance(dataBaseAdapter);
    }
}
