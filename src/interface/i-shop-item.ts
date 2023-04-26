import {ShopItem} from "../shop/shop-item.entity";

export interface IShopItem{
    id: string;
    description: string;
    price: number;
}
export type GetListOfItemShopResponse = IShopItem[];

export type GetOneProductResponse = IShopItem;

export type CreateProductResponse = IShopItem;
export interface GetPaginatedListOfProductsResponse{
    filteredItems: IShopItem[];
    pagesCount: number;
}