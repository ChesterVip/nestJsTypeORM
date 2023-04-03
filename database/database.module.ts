// database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        })],
})
export class DatabaseModule {}