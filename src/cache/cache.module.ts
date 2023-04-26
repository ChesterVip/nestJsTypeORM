import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CacheEntity} from "./cache-entity";

@Module({

  imports: [
      TypeOrmModule.forFeature([CacheEntity])
  ],

})
export class CacheModule {}
