import {Inject, Injectable} from '@nestjs/common';
import {Cron, CronExpression} from "@nestjs/schedule";
import {MailService} from "../mail/mail.service";
// import {MailService} from "../mail/mail.service";


@Injectable()
export class CronService {
    static i:number = 0;
    constructor(
        @Inject(MailService) private readonly mailService: MailService,
    ) {
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
     showSomeInfo() {
        console.log("NIe wysłano Maila po raz: ", CronService.i++);

        // await this.mailService.sendMail(
        //     // "malgorzata.sokolowska@fgfalke.eu",
        //     // "Małgorzata twoja Porno subskrypcja wkrótce się zakończy",
        //     // `<h1>Nie zwlekaj i przedłuż już dziś</h1>,
        //     // <h2>LINK https://pornhub.com</h2>>`);
    }
}
