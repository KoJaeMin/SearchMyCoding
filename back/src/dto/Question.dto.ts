import {IsString, IsNumber} from 'class-validator';

export class QuestionDto{
    @IsNumber()
    readonly typeId : number;

    @IsNumber()
    readonly degree : number;

    @IsString()
    readonly contents : string;
}