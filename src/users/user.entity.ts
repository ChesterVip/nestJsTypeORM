import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ARRAY_MIN_SIZE, isEmail, IsEmail} from "class-validator";
import {BasketService} from "../basket/basket.service";
import {ItemInBasket} from "../basket/item-in-basket.entity";
export enum Role{
    ADMIN = "ADMIN" ,
    USER = "USER",
    EDITOR = "EDITOR",
    AUTHOR = "AUTHOR",
}
@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn("uuid", )
    id:string

    @Column({
        nullable: false,
        unique: true,
    })
    email: string;

    @Column()
    pwdHash: string;

    @Column({
        default: Role.USER
    })
    role: string

    @Column({
        nullable: true,
        default: null,
    })
    currentTokenId: string | null;

    @OneToMany(type => ItemInBasket, object => object.user)
    itemsInBasket: ItemInBasket[];

}