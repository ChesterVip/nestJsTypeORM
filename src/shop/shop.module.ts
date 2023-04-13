import {forwardRef, Module} from '@nestjs/common';
import {ShopController} from "./shop.controller";
import {ShopService} from "./shop.service";
import {BasketModule} from "../basket/basket.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ShopItemDetails} from "./shop-item-details.entity";
import {ShopSet} from "./shop-set.entity";
import {ShopItem} from "./shop-item.entity";
import {MongooseModule} from "@nestjs/mongoose";
import {ShopItemSch, ShopItemSchema} from "../interface/shop-item.schema";

@Module({
    imports: [
        TypeOrmModule.forFeature([ShopItemDetails, ShopSet, ShopItem]),
        forwardRef(() => BasketModule),
        MongooseModule.forFeature([
            {
                name: ShopItemSch.name,
                schema: ShopItemSchema
            }
        ])
    ],
    controllers: [ShopController],
    providers: [ShopService],
    exports: [ShopService]
})
export class ShopModule {
}
