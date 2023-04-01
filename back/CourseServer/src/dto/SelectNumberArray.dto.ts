import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class SelectNumberArrayDto{
    @Transform(({value})=>value.split('-').map(Number))
    @IsNumber({allowNaN : false},{each : true})
    readonly numberString : number[];
}