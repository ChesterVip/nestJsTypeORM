import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ShopModule} from './shop/shop.module';
import {BasketModule} from "./basket/basket.module";
import {UserModule} from './users/user.module';
import { DatabaseModule } from '../database/database.module';
import { CacheModule } from './cache/cache.module';
import { DiscountCodeModule } from './discount-code/discount-code.module';
import { CronModule } from './cron/cron.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        DatabaseModule,
        ShopModule,
        BasketModule,
        UserModule,
        CacheModule,
        DiscountCodeModule,
        MailModule,
        CronModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
