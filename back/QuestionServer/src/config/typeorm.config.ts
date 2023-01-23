import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { QuestionType } from 'src/entities/questiontypes.entity';
import { Question } from 'src/entities/questions.entity';

const config : ConfigService = new ConfigService();

export const typeORMConfig : TypeOrmModuleOptions = {
        type: 'postgres',
        host: config.get<ConfigService>('DATABASE_HOST'),
        port: config.get<ConfigService>('DATABASE_PORT'),
        username: config.get<ConfigService>('DATABASE_USERNAME'),
        password: config.get<ConfigService>('DATABASE_PASSWORD'),
        database: config.get<ConfigService>('DATABASE_DATABASE'),
        entities: [Question, QuestionType],
        synchronize : false
}