import {IsString, IsNumber, IsBoolean} from 'class-validator';

export class QuestionDto{
    @IsNumber()
    readonly typeId : number;

    @IsNumber()
    readonly degree : number;

    @IsString()
    readonly contents : string;

    @IsBoolean()
    readonly activate : boolean;
}