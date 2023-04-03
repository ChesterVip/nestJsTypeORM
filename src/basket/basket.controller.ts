import {Body, Controller, Delete, Get, Inject, Param, Post} from '@nestjs/common';
import {BasketService} from "./basket.service";
import {AddProductDto} from "./dto/addProductDto";
import {
    AddProductToBasketResponse,
    GetBasketStatsResponse,
    GetTotalPriceResponse,
    RemoveProductFromBasketResponse
} from "../interface/basket";
import {ItemInBasket} from "./item-in-basket.entity";

@Controller('/basket')
export class BasketController {
    constructor(
        @Inject(BasketService) private basketService: BasketService,
    ) {
    }

    @Post('/')
    addProductToBasket(
        @Body() item: AddProductDto,
    ): Promise<AddProductToBasketResponse> {
        return this.basketService.adToTheBasket(item);
    }

    @Delete("/:id/:itemId")
    removeProductFromBasket(
        @Param("id") id: string,
        @Param("itemId") itemId: string,
    ): Promise<RemoveProductFromBasketResponse> {
        return this.basketService.remove(id, itemId);
    }

    @Get("/admin")
    listAllBaskets(): Promise<ItemInBasket[]> {
        return this.basketService.getAll4Admin();
    }
    @Get("/all/stats")
    getStats(): Promise<GetBasketStatsResponse>{
        return this.basketService.getStats();
    }

    @Get("/:id")
    listProductsInBasket(
        @Param("id") id: string,
    ): Promise<ItemInBasket[]> {
        return this.basketService.getAll4User(id);
    }


    @Get("/total-price/:id")
    getTotalPrice(
        @Param("id") id: string,
    ): GetTotalPriceResponse {
        return this.basketService.getTotalPrice(id);

    }

    @Delete("/delete")
    deleteBasket(): Promise<string> {
        return this.basketService.removeAll()
    }

    @Delete("/delete/:id")
    deleteUserBasket(
        @Param("id") id: string
    ): Promise<string> {
        return this.basketService.clearUserBasket(id)
    }

}
