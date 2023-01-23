import {IsString, IsNumber, IsBoolean, IsOptional} from 'class-validator';

export class CreateQuestionDto{
    @IsNumber()
    readonly typeId : number;

    @IsNumber()
    readonly degree : number;

    @IsString()
    readonly contents : string;

    @IsOptional()
    @IsBoolean()
    readonly activate : boolean;
}