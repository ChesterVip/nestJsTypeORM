import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {GetListOfItemShopResponse, GetPaginatedListOfProductsResponse, IShopItem} from "../interface/i-shop-item";
import {BasketService} from "../basket/basket.service";

import {ShopItem} from "./shop-item.entity";
import {DataSource, Repository} from "typeorm";
import {ShopItemDetails} from "./shop-item-details.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {MailService} from "../mail/mail.service";
import {AddProductDto} from "./dto/add-product.dto";
import {MulterDiskUploadedFiles} from "../interface/files";
import * as fs from "fs";
import * as path from "path";
import {STORAGE_FIELD, storageDir} from "../utils/storage";
import {catchError} from "rxjs";
import {errorToApiErrorMessage} from "../errors/errorToApiErrorMessage";

@Injectable()
export class ShopService {

    constructor(
        @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
        @InjectRepository(ShopItem) private shopItemRepository: Repository<ShopItem>,
        @Inject(MailService) private readonly mailService: MailService,
        private readonly dataSource: DataSource,
    ) {
    }

    filter(shopItem: ShopItem): IShopItem {
        const {id,price,description} = shopItem;
        return {id,price,description};
    }

    async getProducts(currentPage: number = 1): Promise<GetPaginatedListOfProductsResponse> {
        const maxPerPage = 3;
        let [items, count] = await ShopItem.findAndCount({
            skip: maxPerPage * (currentPage - 1),
            take: maxPerPage,
        });
        const filteredItems = items.map(this.filter);
        const totalPages = Math.ceil(count / maxPerPage)
        console.log({count, totalPages});

        return {
            filteredItems, pagesCount: totalPages
        };
    }

    async hasProduct(id: string): Promise<boolean> {

        return (await this.getProducts()).filteredItems.some(item => item.id === id);
    }

    async getPriceOfProduct(id: string): Promise<number> {
        return (await this.getProducts()).filteredItems.find(item => item.id === id).price;
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

    async addProduct(req: AddProductDto, files: MulterDiskUploadedFiles): Promise<IShopItem> {
        const  photo =  files?.photo?.[0] ?? null;
        // const  film =  files?.film ?? [];
        try {
            const newProduct = await new ShopItem();
            newProduct.description = req.description;
            newProduct.price = req.price;
            newProduct.photoFn = photo.filename;
            await newProduct.save();
            return newProduct;
        } catch (e) {
            try {
                if (photo){
                    fs.unlinkSync(photo.path);
              }throw new Error(e)
            }catch (e2){
                throw new Error(e2)
            }
            }
    }

    async getPhoto(id: string, res: any) {
        try {
            const  one = await ShopItem.findOne({
                where: {id}
            });

            if (!one) throw new Error("No Object found");

            if (!one.photoFn) throw Object.assign(new Error("No foto in this Entity!"), { code: "404" });


            if (!fs.existsSync(path.join(storageDir(), STORAGE_FIELD.PHOTO, one.photoFn))) {
                throw new Error(`File not found: ${one.photoFn}`);
            }

            res.sendFile(one.photoFn, {
                root: path.join(storageDir(), STORAGE_FIELD.PHOTO)
            });

        }catch (error) {
            const { message, code } = error;
            const status = code ? parseInt(code, 10) : 404;

            res.status(status).json({
                error: message,
                status,
            });
        }

        }

}
