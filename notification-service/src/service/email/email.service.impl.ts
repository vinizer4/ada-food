import nodemailer, {Transporter} from 'nodemailer';
import {EmailService} from "../../core/service/email/email.service";

export class EmailServiceImpl implements EmailService {
    private static instance: EmailServiceImpl;
    private transporter: Transporter;

    private constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    public static getInstance(): EmailServiceImpl {
        if (!EmailServiceImpl.instance) {
            EmailServiceImpl.instance = new EmailServiceImpl();
        }
        return EmailServiceImpl.instance;
    }

    async sendEmail(email: string, subject: string, message: string): Promise<void> {
        const mailOptions = {
            from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
            to: email,
            subject,
            text: message,
        }

        await this.transporter.sendMail(mailOptions);
    }
}