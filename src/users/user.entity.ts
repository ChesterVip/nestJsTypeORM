import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {isEmail, IsEmail} from "class-validator";
import {BasketService} from "../basket/basket.service";
import {ItemInBasket} from "../basket/item-in-basket.entity";

@Entity()
export class User extends BaseEntity{

    @Column({
        nullable: false
    })
    @PrimaryGeneratedColumn("uuid", )
    id:string

    @IsEmail()
    @Column({
        length: 100,
        nullable: false,
        unique: true,
    })
    email: string;

    @OneToMany(type => ItemInBasket, object => object.user)
    itemsInBasket: ItemInBasket[];

}