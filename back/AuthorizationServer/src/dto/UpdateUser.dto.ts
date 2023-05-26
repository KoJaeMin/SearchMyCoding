import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto{
    @ApiProperty({
        description : "전자 메일, 아이디"
    })
    @IsString()
    @IsNotEmpty()
    readonly id : string;

    @ApiProperty({
        description : "비밀번호"
    })
    @IsString()
    @IsNotEmpty()
    readonly password : string;

    @ApiProperty({
        description : "바꿀 비밀번호"
    })
    @IsString()
    @IsNotEmpty()
    readonly modifyPassword : string;
}