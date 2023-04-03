import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {BasketModule} from "../basket/basket.module";

@Module({
  imports:[
      TypeOrmModule.forFeature([User]),
    forwardRef(() => UserModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
