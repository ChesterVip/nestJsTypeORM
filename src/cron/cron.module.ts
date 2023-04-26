import {forwardRef, Module} from '@nestjs/common';
import { CronService } from './cron.service';
import {ScheduleModule} from "@nestjs/schedule";
import {MailModule} from "../mail/mail.module";

@Module({
  imports:[
  forwardRef(() => MailModule),
      ScheduleModule.forRoot(),
  ],
  providers: [CronService],
    exports:[CronService],
})
export class CronModule {}
