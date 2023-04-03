import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {DataSource} from "typeorm";
import {RegisterUserResponse} from "../interface/user";
import {User} from "./user.entity";
import {isEmail, IsEmail} from "class-validator";

@Injectable()
export class UserService {

    async registerUser(newUser: RegisterDto): Promise<RegisterUserResponse> {
        const user = new User();
        user.email = newUser.email;
        await user.save();

        return user;
    }

    async getOneUser(id: string): Promise<User>{
        const user = await User.findOne({
            where: {id},
        });
        if (!user){
            return null
        }
        return user;
    }

    async showAllUsers() {
        return await User.find();
    }
}

