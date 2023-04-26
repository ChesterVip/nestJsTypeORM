import {Module} from '@nestjs/common';
import { MailService } from './mail.service';
import {MailConfig} from "../mailerconfig";


@Module({
    providers: [MailConfig, MailService],
    exports: [MailService]
})
export class MailModule {}