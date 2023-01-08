import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { QuestionsModule } from './questions/questions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), QuestionsModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor (private readonly dataSource :DataSource){}
}