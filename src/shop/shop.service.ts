import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {GetListOfItemShopResponse, GetOneProductResponse, GetPaginatedListOfProductsResponse} from "../interface/i-shop-item";
import {BasketService} from "../basket/basket.service";

import {ShopItem} from "./shop-item.entity";
import {DataSource, Like, Repository} from "typeorm";
import {ShopItemDetails} from "./shop-item-details.entity";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class ShopService {
    constructor(
        @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
        @InjectRepository(ShopItem) private shopItemRepository: Repository<ShopItem>,
        private readonly dataSource: DataSource,
    ) {
    }

    async getProducts(currentPage: number = 1): Promise<GetPaginatedListOfProductsResponse> {
        const maxPerPage = 3;


        const [items, count] = await ShopItem.findAndCount({
            skip: maxPerPage * (currentPage -1 ),
            take: maxPerPage,
        });
        const totalPages = Math.ceil(count / maxPerPage)
        console.log({count, totalPages});

        return {
            items, pagesCount: totalPages,
        };

    }

    async hasProduct(id: string): Promise<boolean> {

        return (await this.getProducts()).items.some(item => item.id === id);
    }

    async getPriceOfProduct(id: string): Promise<number> {
        return (await this.getProducts()).items.find(item => item.id === id).price;
    }

    async getOneProduct(id: string): Promise<ShopItem> {
        return await ShopItem.findOne({
            // relations:["details", "sets"],
            where: [
                {id: id}
                // {price: Between(2, 99)},
                // {description: Like("%ch_j%")}
            ],
        });
    }


    async deleteOneProduct(id: string) {
        return ShopItem.delete(id);
    }


    async createProduct(): Promise<ShopItem> {
        const newItem = new ShopItem();
        newItem.description = "zajebiste jak chuj";
        newItem.price = 6655.32

        await ShopItem.save(newItem);

        const details =  new ShopItemDetails();
        details.color ="green";
        details.width = 1933;
        await details.save();

        newItem.details = details;
        await newItem.save();

        return newItem;
    }

    async addBoughtCounter(id: string): Promise<ShopItem> {
        await ShopItem.update(id, {
            wasEverBought: true,
        });

        const item = await ShopItem.findOne({
            where: {id},
        });

        item.boughtCounter++;

        await ShopItem.save(item)
        return item;
    }

    async findProducts(description: string): Promise<GetListOfItemShopResponse> {

      const query = await this.dataSource
            .createQueryBuilder()
            .select("shopItem")
            .from(ShopItem , "shopItem")
            .where("shopItem.description LIKE :description", {
                description: `%${description}%`
            })
          .orderBy("shopItem.price", "ASC")
          .skip()
          .take()
          .getMany();
      return query;
    }
}
