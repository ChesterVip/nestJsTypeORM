import {DataSource} from 'typeorm';
import {ShopItem} from "../src/shop/shop-item.entity";
import {migrations1678955519661} from "../1678955519661-migrations";
import {ShopItemDetails} from "../src/shop/shop-item-details.entity";
import {ItemInBasket} from "../src/basket/item-in-basket.entity";
import {User} from "../src/users/user.entity";
import {CacheEntity} from "../src/cache/cache-entity";

export default new DataSource(
    {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'maniek',
        password: 'maniek666',
        database: 'nestjs',
        synchronize: true,
        entities: [ShopItem, ShopItemDetails, ItemInBasket, User, CacheEntity],
        // migrations: [migrations1678955519661],
    });

