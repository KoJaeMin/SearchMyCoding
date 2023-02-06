import { Answer } from '../entities/answers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AnswerController } from './answers.controller';
import { AnswersService } from './answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  controllers: [AnswerController],
  providers: [AnswersService]
})
export class AnswersModule {}
