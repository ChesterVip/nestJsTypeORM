
import {RegisterDto} from "./dto/register.dto";

import {RegisterUserResponse} from "../interface/user";
import {User} from "./user.entity";

import {hashPwd} from "../utils/hash-pwd";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserService {

    filter(user: User): RegisterUserResponse{
        const {id, email} = user;
        return {id, email}
    }

    // async registerUser(newUser: RegisterDto): Promise<RegisterUserResponse> {
    //     console.log("lllll");
    //     const user = await new User();
    //     user.email = newUser.email;
    //     user.pwdHash = hashPwd(newUser.pwd);
    //     await User.save(user);
    //     return this.filter(user);
    // }
    async registerUser(newUser: RegisterDto): Promise<RegisterUserResponse> {
        const user = User.create({
            email: newUser.email,
            pwdHash: hashPwd(newUser.pwd)
        });
        await User.save(user);
        return this.filter(user);
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

