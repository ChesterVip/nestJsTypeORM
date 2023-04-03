import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ShopItem} from "./shop-item.entity";

@Entity()
export class ShopItemDetails extends BaseEntity{

    @Column({nullable: false})
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 20,
    })
    color: string;

    @Column({
        default: false,
    })
    width: number;

    @OneToOne(t=> ShopItem)
    @JoinColumn()
    shopItem: ShopItem;


}