import {Body, Controller, Delete, Get, HostParam, Inject, Param, Patch, Post, Redirect, Scope} from '@nestjs/common';
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

    @Delete("/delete/:id")
    async deleteOneProduct(
        @Param("id") id: string,
    ):Promise<{} | void> {
         await this.shopService.deleteOneProduct(id);
    }

    @Delete("/delete-many")
    async deleteMany(
        @Body() req: { name: string },
    ){
        await this.shopService.deleteMany(req.name)
    }

    @Post("/")
    async createDummyProduct(): Promise<CreateProductResponse>{
        return await this.shopService.createDummyProduct();
    }


    @Post("/:id")
    async updateProduct(
        @Param("id") id: string,
    ): Promise<CreateProductResponse>{
        return this.shopService.addBoughtCounter(id);
    }

    @Patch("/update/:id")
    async updateOne(
        @Param("id") id: string,
        @Body() req: {
            description?: string,
            price?: number,
        }
    ){
        return this.shopService.updateProduct(id, req.description, req.price)
    }
    // @Get("/welcome")
    // testRedirect(
    //     @HostParam("name") name: string,
    // ) {
    //     return`<h1> Witaj na sklepie  [${name}] gdzie każdy kazdego klepie</h1>`;
    // }
}
