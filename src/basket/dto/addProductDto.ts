import { User } from "src/users/user.entity";

export class AddProductDto {
    productId: string;
    userId: string
    count: number;
}