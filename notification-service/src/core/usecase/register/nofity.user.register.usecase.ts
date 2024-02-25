import {EmailService} from "../../service/email/email.service";
import {NotificationOperationException} from "../../exception/notification.operation.exception";

export class NofityUserRegisterUsecase {
    private static instance: NofityUserRegisterUsecase;

    private emailService: EmailService;

    private constructor(emailService: EmailService) {
        this.emailService = emailService;
    }

    public static getInstance(emailService: EmailService): NofityUserRegisterUsecase {
        if (!NofityUserRegisterUsecase.instance) {
            NofityUserRegisterUsecase.instance = new NofityUserRegisterUsecase(emailService);
        }
        return NofityUserRegisterUsecase.instance;
    }

    async execute(message: string): Promise<void> {
        try {
            const registerDetails = JSON.parse(message);
            console.log("[NofityUserRegisterUsecase] - Notificando usuário: ", registerDetails);
            await this.emailService.sendEmail(registerDetails.email, "Bem vindo", "Seja bem vindo ao nosso sistema!");
        } catch (error) {
            console.error("[NofityUserRegisterUsecase] Erro ao notificar usuário:", error);
            throw new NotificationOperationException("Falha ao notificar usuário.");
        }
    }
}