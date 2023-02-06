import {IsString} from 'class-validator';

export class CreateAnswerDto{
    @IsString()
    readonly question : string;

    @IsString()
    readonly type : string;

    @IsString()
    readonly contents : string;
}