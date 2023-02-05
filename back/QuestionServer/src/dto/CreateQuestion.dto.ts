import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNumber, IsBoolean, IsOptional} from 'class-validator';

export class CreateQuestionDto{
    @ApiProperty({
        description : "질문 유형"
    })
    @IsString()
    readonly type : string;

    @ApiProperty({
        description : "질문 내용"
    })
    @IsString()
    readonly contents : string;

    @ApiProperty({
        default : true,
        description : "활성화 여부"
    })
    @IsOptional()
    @IsBoolean()
    readonly activate : boolean;
}