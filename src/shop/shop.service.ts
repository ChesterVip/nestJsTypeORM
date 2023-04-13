import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {
    CreateProductResponse,
    GetListOfItemShopResponse,
    GetPaginatedListOfProductsResponse
} from "../interface/i-shop-item";
import {BasketService} from "../basket/basket.service";

import {ShopItem} from "./shop-item.entity";
import {DataSource, Repository} from "typeorm";
import {ShopItemDetails} from "./shop-item-details.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {InjectModel} from "@nestjs/mongoose";
import {ShopItemSch} from "../interface/shop-item.schema";
import {Model} from 'mongoose';


@Injectable()
export class ShopService {
    constructor(
        @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
        @InjectRepository(ShopItem) private shopItemRepository: Repository<ShopItem>,
        private readonly dataSource: DataSource,
        @InjectModel(ShopItemSch.name)
        private shopItem: Model<ShopItemSch>,
    ) {
    }

    async getProducts(currentPage: number = 1): Promise<GetPaginatedListOfProductsResponse | any> {
        // const maxPerPage = 3;
        //
        //
        // const [items, count] = await ShopItem.findAndCount({
        //     skip: maxPerPage * (currentPage -1 ),
        //     take: maxPerPage,
        // });
        // const totalPages = Math.ceil(count / maxPerPage)
        // console.log({count, totalPages});
        //
        // return {
        //     items, pagesCount: totalPages,

        const PRODUCT_QUANTITY_PER_PAGE = 2;
        const products = await this.shopItem
            .find()
            .limit(PRODUCT_QUANTITY_PER_PAGE)
            .skip(PRODUCT_QUANTITY_PER_PAGE * (currentPage - 1))
            .select(["_id", "description", "price", "createdAt"])
            .exec();
        const totalNumber = await this.shopItem.countDocuments();
        return {
            items: products,
            pagesCount: Math.round(totalNumber / PRODUCT_QUANTITY_PER_PAGE),
        };


    }

    async hasProduct(id: string): Promise<boolean> {

        return (await this.getProducts()).items.some(item => item.id === id);
    }

    async getPriceOfProduct(id: string): Promise<number> {
        return (await this.getProducts()).items.find(item => item.id === id).price;
    }

    async getOneProduct(id: string): Promise<ShopItem> {
        return this.shopItem.findById(id);
        // return await ShopItem.findOne({
        //     // relations:["details", "sets"],
        //     where: [
        //         {id: id}
        //         // {price: Between(2, 99)},
        //         // {description: Like("%ch_j%")}
        //     ],
        // });
    }


    async deleteOneProduct(id: string): Promise<{}> {
        if (await this.shopItem.deleteOne({_id: id}).exec()) {
            return JSON.stringify({
                status: "ok",
            })
        } else {
            return JSON.stringify({
                status: "not ok",
            })
        }

    }


    async createProduct(): Promise<ShopItem> {
        const newItem = new ShopItem();
        newItem.description = "zajebiste jak chuj";
        newItem.price = 6655.32

        await ShopItem.save(newItem);

        const details = new ShopItemDetails();
        details.color = "green";
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
            .from(ShopItem, "shopItem")
            .where("shopItem.description LIKE :description", {
                description: `%${description}%`
            })
            .orderBy("shopItem.price", "ASC")
            .skip()
            .take()
            .getMany();
        return query;
    }

    async createDummyProduct(): Promise<CreateProductResponse> {
        const newDummyProduct = await this.shopItem.create({
            description: "korniszon 1szt.",
            price: 40.93,
            createdAt: new Date(),
        });
        await newDummyProduct.save();
        return newDummyProduct;
    }

    async deleteMany(name: string) {
        await this.shopItem.deleteMany({description: name});
    }

    async updateProduct(id: string, descriptio: string = null, pric: number = null) {
        const {price, description} = await this.shopItem.findOne({_id: id});

        return this.shopItem.findByIdAndUpdate(id,
            {
                description: descriptio? descriptio : description,
                price: pric? pric: price,
            });
    }
}
