import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserWithoutPasswordDto{
    @ApiProperty({
        description : "전자 메일, 아이디"
    })
    @IsString()
    @IsNotEmpty()
    readonly email : string;

    @ApiProperty({
        description : "이름"
    })
    @IsString()
    @IsNotEmpty()
    readonly name : string;
}