import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {IShopItem} from "./i-shop-item";
import {ShopItem} from "../shop/shop-item.entity";
import {ShopItemDetails} from "../shop/shop-item-details.entity";
import {ItemInBasket} from "../basket/item-in-basket.entity";
import {ShopSet} from "../shop/shop-set.entity";

@Schema()
export class ShopItemSch extends Document{
    @Prop()
    id: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    boughtCounter: number;

    @Prop()
    createdAt: Date;

    @Prop()
    wasEverBought: boolean;

}

export const ShopItemSchema = SchemaFactory.createForClass(  ShopItemSch)