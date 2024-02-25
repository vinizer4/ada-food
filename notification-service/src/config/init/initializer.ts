import {MessageBrokerAdapter} from "../adapters/message/message.broker.adapter";
import {NotifyOrderCreationUsecase} from "../../core/usecase/order/notify.order.creation.usecase";
import {EmailServiceImpl} from "../../service/email/email.service.impl";
import {NofityUserRegisterUsecase} from "../../core/usecase/register/nofity.user.register.usecase";

export class Initializer {
    static async initialize() {

        MessageBrokerAdapter.createMessagerindAdapter();
        const messageBrokerAdapter = MessageBrokerAdapter.getMessagerindAdapter();
        await messageBrokerAdapter.connect();

        const emailService = EmailServiceImpl.getInstance();

        const notifyOrderCreationUseCase = NotifyOrderCreationUsecase.getInstance(
            emailService
        )

        const notifyUserRegisterUseCase = NofityUserRegisterUsecase.getInstance(
            emailService
        )

        await messageBrokerAdapter.consume("order-notification", async (message: string) => {
            await notifyOrderCreationUseCase.execute(message);
        });

        await messageBrokerAdapter.consume("user-register-email-notification", async (message: string) => {
            await notifyUserRegisterUseCase.execute(message);
        });
    }
}