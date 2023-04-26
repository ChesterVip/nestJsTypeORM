import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn, JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {ShopItemDetails} from "./shop-item-details.entity";
import {ShopSet} from "./shop-set.entity";
import {IShopItem} from "../interface/i-shop-item";
import {ItemInBasket} from "../basket/item-in-basket.entity";

@Entity()
export class ShopItem extends BaseEntity implements IShopItem {

    @Column({
        nullable: false,
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;



    @Column({
        default: "(brak)",
        length: 1000,
        nullable: true,
    })
    description: string | null;

    @Column({
        type: "float",
        precision: 6,
        scale: 2,
    })
    price: number;

    @Column({
        default: null,
        nullable: true,
    })
    photoFn: string;
    @Column({
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @Column({
        default: 0,

    })
    boughtCounter: number;


    @Column({
        default: false,
    })
    wasEverBought: boolean;

    @OneToOne(t => ShopItemDetails)
    @JoinColumn()
    details: ShopItemDetails;


    @ManyToOne(type => ShopItem, entity=> entity.subShopItems)
    mainShopItem: ShopItem;

    @OneToMany(type => ShopItem, object => object.mainShopItem)
    subShopItems: ShopItem[];

    @ManyToMany(type => ShopSet, entity => entity.items)
    @JoinTable()
    sets: ShopSet[];

    @OneToMany(type => ItemInBasket, entity => entity.shopItem)
    itemInBasket: ItemInBasket;
}