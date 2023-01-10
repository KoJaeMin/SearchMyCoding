import {IsString} from 'class-validator';

export class QuestionTypeDto{
    @IsString()
    readonly TypeName : string;
}