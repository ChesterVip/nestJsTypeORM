import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    RelationOptions
} from "typeorm";
import {ShopItem} from "./shop-item.entity";

@Entity()
export class ShopSet extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
        id: string;

    @Column({
        length: 50,
    })
    name: string;


    @ManyToMany(type => ShopItem, entity => entity.sets)
    @JoinTable()
    items: ShopItem[]
}