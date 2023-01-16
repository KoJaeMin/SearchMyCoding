import { Module } from '@nestjs/common';
import { QuestionTypesController } from './questiontypes.controller';
import { QuestionTypesService } from './questiontypes.service';

@Module({
  controllers: [QuestionTypesController],
  providers: [, QuestionTypesService]
})
export class QuestionTypesModule {}
