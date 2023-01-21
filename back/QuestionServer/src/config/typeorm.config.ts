import 'dotenv/config';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { QuestionType } from 'src/entities/questiontypes.entity';
import { Question } from 'src/entities/questions.entity';

export const typeORMConfig : TypeOrmModuleOptions = {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        entities: [Question, QuestionType],
        synchronize : false
}