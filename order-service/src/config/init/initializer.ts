import {MessageBrokerAdapter} from "../adapters/message/messagerind.adapter";
import {DataBaseAdapter} from "../adapters/db/database.adapter";
import {CreateOrderUsecase} from "../../core/usecase/order/create/create.order.usecase";
import {FindOrderUsecase} from "../../core/usecase/order/find/find.order.usecase";
import {FindOrderByUserUsecase} from "../../core/usecase/order/find/find.order.by.user.usecase";

export class Initializer {
    static async initialize() {
        await DataBaseAdapter.createUserRepository();
        const dataBaseAdapter = DataBaseAdapter.getOrderRepository();

        MessageBrokerAdapter.createMessagerindAdapter();
        const messageBrokerAdapter = MessageBrokerAdapter.getMessagerindAdapter();
        await messageBrokerAdapter.connect();

        CreateOrderUsecase.getInstance(dataBaseAdapter, messageBrokerAdapter);
        FindOrderUsecase.getInstance(dataBaseAdapter);
        FindOrderByUserUsecase.getInstance(dataBaseAdapter);
    }
}
