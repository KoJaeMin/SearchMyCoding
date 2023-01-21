import {IsString} from 'class-validator';

export class QuestionTypeDto{
    @IsString()
    readonly typename : string;

    @IsString()
    readonly description : string;
}