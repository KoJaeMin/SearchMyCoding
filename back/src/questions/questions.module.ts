import { QuestionType } from 'src/entities/questiontypes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Question } from 'src/entities/questions.entity';

@Module({
    imports : [TypeOrmModule.forFeature([Question, QuestionType])],
    controllers : [QuestionsController],
    providers : [QuestionsService, ]
})
export class QuestionsModule {}