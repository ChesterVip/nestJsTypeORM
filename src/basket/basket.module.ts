import {forwardRef, Module} from "@nestjs/common";
import {BasketController} from "./basket.controller";
import {BasketService} from "./basket.service";
import {ShopModule} from "../shop/shop.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ItemInBasket} from "./item-in-basket.entity";
import {UserModule} from "../users/user.module";

@Module(
    {
        imports: [
            forwardRef(() => ShopModule),
            forwardRef(() => UserModule),
            TypeOrmModule.forFeature([ItemInBasket])
        ],
        controllers: [BasketController],
        providers: [BasketService],
        exports: [BasketService]
    }
)
export class BasketModule {

}