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
    readonly modifyPassword? : string;

    @ApiProperty({
        description : "바꿀 이메일"
    })
    @IsString()
    readonly modifyEmail? : string;

    @ApiProperty({
        description : "바꿀 이름"
    })
    @IsString()
    readonly modifyName? : string;
}