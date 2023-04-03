import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ShopModule} from './shop/shop.module';
import {BasketModule} from "./basket/basket.module";
import {UserModule} from './users/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { DatabaseModule } from '../database/database.module';
import {DataSource} from "typeorm";

@Module({
    imports: [
        DatabaseModule,
        ShopModule,
        BasketModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
