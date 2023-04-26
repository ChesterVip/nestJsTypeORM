import {forwardRef, Module} from '@nestjs/common';
import {ShopController} from "./shop.controller";
import {ShopService} from "./shop.service";
import {BasketModule} from "../basket/basket.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ShopItemDetails} from "./shop-item-details.entity";
import {ShopSet} from "./shop-set.entity";
import {ShopItem} from "./shop-item.entity";
import {MailModule} from "../mail/mail.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ShopItemDetails, ShopSet, ShopItem]),
        forwardRef(() => BasketModule),
        forwardRef(() => MailModule),
    ],
    controllers: [ShopController],
    providers: [ShopService],
    exports: [ShopService]
})
export class ShopModule {
}
