import { Injectable } from '@nestjs/common';
import { Options } from 'nodemailer/lib/smtp-transport';
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class MailConfig {

    getOptions(): Options {
        return {
            host: 'serwer1865028.home.pl',
            port: 587,
            secure: false,
            auth: {
                user:process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            }
        };
    }
}
