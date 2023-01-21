import { QuestionType } from 'QServer/src/entities/questiontypes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuestionTypesController } from './questiontypes.controller';
import { QuestionTypesService } from './questiontypes.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionType])],
  controllers: [QuestionTypesController],
  providers: [QuestionTypesService]
})
export class QuestionTypesModule {}
