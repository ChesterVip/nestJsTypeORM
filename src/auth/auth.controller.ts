import {Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthLoginDto} from "./dto/auth-login.dto";
import {Response} from "express";
import {AuthGuard} from "@nestjs/passport";
import {UserObject} from "../decorators/user-object.decorator";
import {UserService} from "../users/user.service";
import {User} from "../users/user.entity";


@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post("/login")
   phoneRegister(
      @Res() res: Response,
      @Body() req: AuthLoginDto,
  ): Promise<any>{
    console.log('auth')
    return this.authService.login(req,res);
  }

  @Get("/logout")
  @UseGuards(AuthGuard("jwt"))
      async logout(
          @UserObject() u: User,
          @Res() res: Response){
    return this.authService.logout(u,res);
  }
}
