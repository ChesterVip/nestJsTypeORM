import {AddProductDto} from "./dto/addProductDto";
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {ShopItem} from "../shop/shop-item.entity";
import {User} from "../users/user.entity";
import {getEntityManagerToken} from "@nestjs/typeorm";

@Entity()
export class ItemInBasket extends BaseEntity{

    @Column({nullable: false})
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    count: number;

    @ManyToOne(type => ShopItem, entity => entity.itemInBasket)
    @JoinColumn()
    shopItem: ShopItem

    @ManyToOne(type => User, entity => entity.itemsInBasket)
    @JoinColumn()
    user: User;

}