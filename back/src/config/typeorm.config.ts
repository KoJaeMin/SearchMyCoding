import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Question } from "src/entities/questions.entity";
import { QuestionType } from "src/entities/questiontypes.entity";

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities: [Question, QuestionType],
    synchronize : false
}