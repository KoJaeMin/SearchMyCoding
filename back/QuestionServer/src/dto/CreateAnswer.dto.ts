import { ApiProperty } from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class CreateAnswerDto{
    @ApiProperty({
        description : "질문"
    })
    @IsString()
    readonly questionId : number;

    @ApiProperty({
        description : "대답 유형"
    })
    @IsString()
    readonly answerType : string;

    @ApiProperty({
        description : "대답"
    })
    @IsString()
    readonly contents : string;
}