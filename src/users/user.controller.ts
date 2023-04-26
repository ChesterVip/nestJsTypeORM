import {Body, Controller, Get, Inject, Param, Post, UseGuards} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {GetOneUserResponse, GetUsersResponse, RegisterUserResponse} from "../interface/user";
import {UserService} from "./user.service";
import {RoleGuard} from "../guards/role.guard";
import {UserRole} from "../decorators/user-role.decorator";
import {Role, User} from "./user.entity";
import {AuthGuard} from "@nestjs/passport";
import {UserObject} from "../decorators/user-object.decorator";

@Controller('/user')
export class UserController {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
    ) {}



    @UseGuards(AuthGuard("jwt"), RoleGuard)
    @UserRole(Role.USER)
    @Get("/:id")
    async showOneUser(
        @Param("id") id: string,
        @UserObject() user: User
    ): Promise<GetOneUserResponse> {
        return this.userService.getOneUser(id);
    }

    @Get("/")
    async showAllUsers(): Promise<GetUsersResponse> {
        return this.userService.showAllUsers();
    }

    @Post("/register")
     register(
        @Body() newUser: RegisterDto,
    ): Promise<RegisterUserResponse> {
        console.log("xxxx");
        return this.userService.registerUser(newUser)
    }
}
