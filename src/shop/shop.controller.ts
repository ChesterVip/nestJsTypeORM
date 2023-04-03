import {Controller, Delete, Get, HostParam, Inject, Param, Post, Scope} from '@nestjs/common';
import {
    CreateProductResponse,
    GetListOfItemShopResponse,
    GetOneProductResponse,
    GetPaginatedListOfProductsResponse
} from "../interface/i-shop-item";
import {ShopService} from "./shop.service";


@Controller("/shop")
export class ShopController {

    onApplicationBootstrap(){
        console.log("Wstałem");
    }
    onApplicationShutdown(){
        console.log("wyjebane")
    }
    constructor(
        @Inject(ShopService) private shopService: ShopService,
    ) {

    }

    @Get('/page/:page')
    async index(@Param("page") page: number,
    ): Promise<GetPaginatedListOfProductsResponse> {
        return await this.shopService.getProducts(page);
    }

    @Get("/find/:desc")
    async testFindItem(
        @Param("desc") desc: string,
    ): Promise<GetListOfItemShopResponse>{
        return await this.shopService.findProducts(desc)
    }


    @Get("/:id")
    async getOneProduct(
        @Param("id") id: string,
    ): Promise<GetOneProductResponse>{
        return await this.shopService.getOneProduct(id);
    }

    @Delete("/:id")
    async deleteOneProduct(
        @Param("id") id: string,
    ): Promise<{}>{
        return await this.shopService.deleteOneProduct(id);
    }

    @Post("/")
    async createNewProduct(): Promise<CreateProductResponse>{
        return await this.shopService.createProduct();
    }

    @Post("/:id")
    async updateProduct(
        @Param("id") id: string,
    ): Promise<CreateProductResponse>{
        return this.shopService.addBoughtCounter(id);
    }

    // @Get("/welcome")
    // testRedirect(
    //     @HostParam("name") name: string,
    // ) {
    //     return`<h1> Witaj na sklepie  [${name}] gdzie każdy kazdego klepie</h1>`;
    // }
}
