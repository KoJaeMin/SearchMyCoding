import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCourseCategoryDto{
    @ApiProperty({
        description : "강의"
    })
    @IsString()
    readonly course : string;

    @ApiProperty({
        description : "카테고리"
    })
    @IsString()
    readonly category : string;
}