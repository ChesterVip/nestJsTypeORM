import {Body, Controller, Get, Inject, Param, Post} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {GetOneUserResponse, GetUsersResponse, RegisterUserResponse} from "../interface/user";
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
    private userService: UserService;

    constructor(
        @Inject(UserService) userService: UserService,
    ) {
        this.userService = new UserService();
    }

    @Post("/register")
    register(
        @Body() newUser: RegisterDto,
    ): Promise<RegisterUserResponse> {
        return this.userService.registerUser(newUser)
    }

    @Get("/:id")
    showOneUser(
        @Param("id") id: string,
    ): Promise<GetOneUserResponse> {
        return this.userService.getOneUser(id);
    }

    @Get("/")
    showAllUsers(): Promise<GetUsersResponse> {
        return this.userService.showAllUsers();
    }
}
