import {IsString} from 'class-validator';

export class CreateQuestionTypeDto{
    @IsString()
    readonly typename : string;

    @IsString()
    readonly description : string;
}