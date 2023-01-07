import {IsString, IsNumber} from 'class-validator';

export class CreateQuestionDto{
    @IsNumber()
    readonly typeId : number;

    @IsNumber()
    readonly degree : number;

    @IsString()
    readonly contents : string;
}