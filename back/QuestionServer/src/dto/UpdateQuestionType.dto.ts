import { CreateQuestionTypeDto } from './CreateQuestionType.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateQuestionTypeDto extends PartialType(CreateQuestionTypeDto){}