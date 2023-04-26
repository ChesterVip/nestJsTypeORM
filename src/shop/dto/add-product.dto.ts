import {IsNumber, IsString, Min} from "class-validator";

export class AddProductDto {

    @IsString()
    description: string;

    @IsNumber()
    @Min(1)
    price: number;

    photoFn: string
}