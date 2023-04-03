import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class SelectNumberArrayDto{
    @ApiProperty({
        description : "숫자들 배열, 형식 : 1-2-3-4-5(복수) 또는 1(단일)"
    })
    @Transform(({value})=>value.includes('-')?value.split('-').map(Number):[Number(value)])
    @IsNumber({allowNaN : false},{each : true})
    readonly numberString : number[];
}