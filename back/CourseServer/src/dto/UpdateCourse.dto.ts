import { CreateCourseDto } from './CreateCourse.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateQuestionDto extends PartialType(CreateCourseDto){}