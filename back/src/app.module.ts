import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { QuestionsModule } from './questions/questions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), QuestionsModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}

// @Module({
//   imports: [TypeOrmModule.forRoot(typeORMConfig), QuestionsModule, MbtiModule, CoursesModule,],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}