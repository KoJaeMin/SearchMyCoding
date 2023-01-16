import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { QuestionsModule } from './questions/questions.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionTypesModule } from './questiontypes/questiontypes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    QuestionsModule,
    QuestionTypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}