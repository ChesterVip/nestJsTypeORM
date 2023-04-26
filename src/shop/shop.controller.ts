import {
    Body,
    Controller,
    Delete,
    Get,
    ImATeapotException,
    Inject,
    Param,
    Post,
    Res,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import {
    CreateProductResponse,
    GetListOfItemShopResponse,
    GetOneProductResponse,
    GetPaginatedListOfProductsResponse,
    IShopItem
} from "../interface/i-shop-item";
import {ShopService} from "./shop.service";
import {AddProductDto} from "./dto/add-product.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {multerStorage, STORAGE_FIELD, storageDir} from "../utils/storage";
import {MulterDiskUploadedFiles} from "../interface/files";
import * as path from "path";


@Controller("/shop")
export class ShopController {

    onApplicationBootstrap() {
        console.log("Wstałem");
    }

    onApplicationShutdown() {
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
    ): Promise<GetListOfItemShopResponse> {
        return await this.shopService.findProducts(desc)
    }


    @Get("/:id")
    async getOneProduct(
        @Param("id") id: string,
    ): Promise<GetOneProductResponse> {
        return await this.shopService.getOneProduct(id);
    }

    @Delete("/:id")
    async deleteOneProduct(
        @Param("id") id: string,
    ): Promise<{}> {
        return await this.shopService.deleteOneProduct(id);
    }

    @Post("/")
    @UseInterceptors(
        FileFieldsInterceptor([
            {
                name: STORAGE_FIELD.PHOTO,
                maxCount: 1,
            },
            //     {
            //     name: STORAGE_FIELD.FILM,
            //     maxCount: 1,
            // },
            ],
            {
                storage: multerStorage()
            }, ))
    async addProduct(
        @Body() req: AddProductDto,
        @UploadedFiles() files: MulterDiskUploadedFiles,
    ): Promise<IShopItem> {
        return await this.shopService.addProduct(req, files);
    }



    // @Post("/")
    // async createNewProduct(): Promise<CreateProductResponse>{
    //     return await this.shopService.createProduct();
    // }


    @Post("/:id")
    async updateProduct(
        @Param("id") id: string,
    ): Promise<CreateProductResponse> {
        return this.shopService.addBoughtCounter(id);
    }

    @Get("/xxx/test")
    test() {
        throw new ImATeapotException();
    }

    @Get("photo/:id")
    async getPhoto(
        @Param("id") id: string,
        @Res() res: any,
    ):Promise<any>{
        return this.shopService.getPhoto(id, res);
    }
    // @Get("/welcome")
    // testRedirect(
    //     @HostParam("name") name: string,
    // ) {
    //     return`<h1> Witaj na sklepie  [${name}] gdzie każdy kazdego klepie</h1>`;
    // }
}
