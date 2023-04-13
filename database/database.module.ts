// database.module.ts
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'maniek',
            password: 'maniek666',
            database: 'nestjs',
            bigNumberStrings: false,
            entities: [],
            autoLoadEntities: true,
            synchronize: true,
            logging: true,
        }),
        MongooseModule.forRoot
        ('mongodb+srv://mariussokolovsky:-nqbrNuBam*MX9S@maniek.uwv8idy.mongodb.net/?retryWrites=true&w=majority'),
    ],
})
export class DatabaseModule {
}