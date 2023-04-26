import { Injectable } from '@nestjs/common';
import { MailConfig } from '../mailerconfig';
import { createTransport, Transporter } from 'nodemailer';
import { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
    private transporter: Transporter;

    constructor(private readonly mailConfig: MailConfig) {
        const options: Options = mailConfig.getOptions();
        this.transporter = createTransport(options);
    }

    async sendMail(to: string, subject: string, html: string) {
        const message = {
            from: `Mariusz CHUJOWSKI + <${this.mailConfig.getOptions().auth.user}>`,
            to,
            subject,
            html,
        };
        const info = await this.transporter.sendMail(message);
        console.log('Wiadomość wysłana: %s', info.messageId);
    }
}
