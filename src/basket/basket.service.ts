import {forwardRef, Inject, Injectable, Scope} from '@nestjs/common';
import {AddProductDto} from "./dto/addProductDto";
import {
    AddProductToBasketResponse,
    GetBasketStatsResponse,
    GetTotalPriceResponse,
    RemoveProductFromBasketResponse
} from "../interface/basket";
import {ShopService} from "../shop/shop.service";
import {DataSource} from "typeorm";
import {ItemInBasket} from "./item-in-basket.entity";
import {UserService} from "../users/user.service";


@Injectable({
    scope: Scope.REQUEST,
})
export class BasketService {

    constructor(
        @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        private readonly dataSource: DataSource,
    ) {
    }

    async adToTheBasket(item: AddProductDto): Promise<AddProductToBasketResponse> {
        const {count, productId, userId} = item;
        const shopItem = await this.shopService.getOneProduct(productId);
        const user = await this.userService.getOneUser(userId);
        if (
            typeof count !== "number"
            || count === 0
            || userId === ""
            || productId == ""
            || !shopItem
            || !user
        ) return {
            isSuccess: false,

        }
        const itemBasket = new ItemInBasket();

        itemBasket.count = count;

        await itemBasket.save();
        itemBasket.shopItem = shopItem;
        itemBasket.user = user;
        shopItem.itemInBasket = itemBasket;
        await itemBasket.save();


        return {
            isSuccess: true,
            id: itemBasket.id,

        };
    }

    async remove(id: string, itemId: string): Promise<RemoveProductFromBasketResponse> {
        const user = await this.userService.getOneUser(id) ?? {};
        console.log(user);
        if (!user) {
            throw new Error("Wyjebało bo nie znalazło urzytkownika")
        }
        const item = await ItemInBasket.findOne({
            where: {
                id: itemId,
                user,
            },
        })
        console.log(item);
        if (item) {
            await item.remove();
            return {
                isSuccess: true
            };
        }
        return {
            isSuccess: false,
        }

    }

    async getAll4User(id: string): Promise<ItemInBasket[]> {
        const user = await Promise.all([this.userService.getOneUser(id)]) ?? {};
        if (!user) {
            throw new Error("User not kurwa found");
        }
        return await ItemInBasket.find({
            where: {user},
            relations: ["shopItem"],
        });
    }

    async getAll4Admin(): Promise<ItemInBasket[]> {
        return await ItemInBasket.find({
            where: {},
            relations: ["shopItem", "user"],
        });
    }

    async getTotalPrice(id): Promise<GetTotalPriceResponse> {
        const item = await this.getAll4User(id);
        if (!item.every(item => item.shopItem.price)) {
            const alternativeBasket = item.filter(item => item.shopItem.id)
            return {
                isSuccess: false,
                alternativeBasket,
            }
        }
        return (await Promise.all(
            item
                .flatMap(async x => x.count * (await x.shopItem.price) * 1.23)))

            .reduce((prev: number, curr: number) => prev + curr, 0).toFixed(2);
    }

    // async countPromo(): Promise<number> {
    //     return await this.getTotalPrice() > 10 ? 1 : 0;
    // }

    async removeAll() {
        await ItemInBasket.delete({});
        return `<h1>Koszyk PUSTY niczym jaja</h1>`
    }

    async clearUserBasket(id: string) {
        const user = await this.userService.getOneUser(id) ?? {};
        if (!user) {
            throw new Error("NI chuja nie mogę znaleść urzytkownika");
        }

        await ItemInBasket.delete({
            user
        })
        return `<h1>${id}: Koszyk PUSTY niczym jaja</h1>`
    }

    async getStats(): Promise<GetBasketStatsResponse> {
        const {itemInBasketAvgPrice} = await this.dataSource
            .createQueryBuilder()
            .select("AVG(shopItem.price)", "itemInBasketAvgPrice")
            .from(ItemInBasket, "itemInBasket")
            .leftJoinAndSelect("itemInBasket.shopItem", "shopItem")
            .getRawOne();

        const allItemsInBasket = await this.getAll4Admin();

        const baskets: {
            [userId: string ]: number
        } = {};
        for (const oneItemInBasket of allItemsInBasket){
            console.log(oneItemInBasket);
            baskets[oneItemInBasket.user.id] = baskets[oneItemInBasket.user.id] || 0;
            console.log(baskets);
            baskets[oneItemInBasket.user.id] += oneItemInBasket.shopItem.price *
                oneItemInBasket.count * 1.23;
        }
        const basketValues = Object.values(baskets);

        const basketAvgTotalPrice = basketValues.reduce((prev: number, curr: number) => prev + curr, 0) / basketValues.length;

        return {
            itemInBasketAvgPrice: Number(itemInBasketAvgPrice.toFixed(2)),
            basketAvgTotalPrice: Number(basketAvgTotalPrice.toFixed(2)),
        }
    }

}
