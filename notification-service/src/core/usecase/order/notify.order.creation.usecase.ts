import {EmailService} from "../../service/email/email.service";
import {NotificationOperationException} from "../../exception/notification.operation.exception";

export class NotifyOrderCreationUsecase {
    private static instance: NotifyOrderCreationUsecase;

    private emailService: EmailService;

    private constructor(emailService: EmailService) {
        this.emailService = emailService;
    }

    public static getInstance(emailService: EmailService): NotifyOrderCreationUsecase {
        if (!NotifyOrderCreationUsecase.instance) {
            NotifyOrderCreationUsecase.instance = new NotifyOrderCreationUsecase(emailService);
        }
        return NotifyOrderCreationUsecase.instance;
    }

    async execute(message: string): Promise<void> {
        try {
            const orderDetails = JSON.parse(message);
            console.log("[NotifyOrderCreationUsecase] - Notificando criação de pedido: ", message);
            const emailText = `Olá, seu pedido ${orderDetails.id} foi criado com sucesso!`;

            await this.emailService.sendEmail(orderDetails.user.email, "Pedido Criado", emailText);
        } catch (error: any) {
            throw this.exceptionHandler(error);
        }
    }

    private exceptionHandler(error: any): Error {
        console.error("[NotifyOrderCreationUsecase] - Erro na execução do usecase de notificação de criação de pedido: ", error);
        throw new NotificationOperationException("Erro na notificação de criação de pedido");
    }
}