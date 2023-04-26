import {Body, Controller, Delete, Get, Inject, Param, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import {BasketService} from "./basket.service";
import {AddProductDto} from "./dto/addProductDto";
import {
    AddProductToBasketResponse,
    GetBasketStatsResponse,
    GetTotalPriceResponse,
    RemoveProductFromBasketResponse
} from "../interface/basket";
import {ItemInBasket} from "./item-in-basket.entity";
import {PasswordProtectGuard} from "../guards/password-protect.guard";
import {UsePassword} from "../decorators/use-password.decorator";
import {MyTimeoutInterceptor} from "../interceptors/my-timeout.interceptor";
import {MyCacheInterceptor} from "../interceptors/my-cache.interceptor";
import {UseTimeout} from "../decorators/use-timeout.decorator";
import {AuthGuard} from "@nestjs/passport";
import {UserObject} from "../decorators/user-object.decorator";
import {Role, User} from "../users/user.entity";
import {RoleGuard} from "../guards/role.guard";
import {UserRole} from "../decorators/user-role.decorator";

@Controller('/basket')
export class BasketController {
    constructor(
        @Inject(BasketService) private basketService: BasketService,
    ) {
    }

    @Post('/')
    @UseGuards(AuthGuard("jwt"))
    addProductToBasket(
        @Body() item: AddProductDto,
        @UserObject() user: User
    ): Promise<AddProductToBasketResponse> {
        return this.basketService.adToTheBasket(item, user);
    }

    @Delete("/:id/:itemId")
    removeProductFromBasket(
        @Param("id") id: string,
        @Param("itemId") itemId: string,
    ): Promise<RemoveProductFromBasketResponse> {
        return this.basketService.remove(id, itemId);
    }

    @Get("/admin")
    @UseGuards(AuthGuard("jwt"))
    // @UsePassword("admin")
    @UseGuards(RoleGuard)
    @UserRole(Role.ADMIN)
    listAllBaskets(): Promise<ItemInBasket[]> {
        // return new Promise(resolve => {});
        return this.basketService.getAll4Admin();
    }
    @Get("/all/stats")
    @UsePassword("STATSPASS")
    @UseGuards(PasswordProtectGuard)
    @UseTimeout(3)
    @UseInterceptors(MyTimeoutInterceptor, MyCacheInterceptor)
    getStats(): Promise<GetBasketStatsResponse>{
        return this.basketService.getStats();
        // return new Promise(resolve => {});
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/:id")
    listProductsInBasket(
        @Param("id") id: string,
        @UserObject() user: User
    ): Promise<ItemInBasket[]> {
        console.log(user)
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
