import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class AuthLoginDto{

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    pwd: string;
}