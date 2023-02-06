import {IsString} from 'class-validator';

export class CreateAnswerDto{
    @IsString()
    readonly question : string;

    @IsString()
    readonly answerType : string;

    @IsString()
    readonly contents : string;
}