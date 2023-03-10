import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto{
    @ApiProperty({
        description : "카테고리"
    })
    @IsString()
    readonly name : string;

    @ApiProperty({
        description : "강의"
    })
    @IsNumber()
    readonly courseId : number;
}