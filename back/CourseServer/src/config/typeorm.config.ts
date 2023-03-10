import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const config : ConfigService = new ConfigService();

export const typeORMConfig : TypeOrmModuleOptions = {
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USERNAME'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_DATABASE'),
        // entities: [],
        synchronize : false
}

export const testTypeORMConfig : TypeOrmModuleOptions = {
        type: 'postgres',
        host: config.get<string>('TEST_DATABASE_HOST'),
        port: config.get<number>('TEST_DATABASE_PORT'),
        username: config.get<string>('TEST_DATABASE_USERNAME'),
        password: config.get<string>('TEST_DATABASE_PASSWORD'),
        database: config.get<string>('TEST_DATABASE_DATABASE'),
        // entities: [],
        synchronize : true
}