import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto{
    @ApiProperty({
        description : "이름"
    })
    @IsString()
    readonly name : string;

    @ApiProperty({
        description : "비밀번호"
    })
    @IsString()
    readonly password : string;
}