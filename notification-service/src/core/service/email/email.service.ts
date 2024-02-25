export interface EmailService {
    sendEmail(email: string, subject: string, message: string): Promise<void>;
}