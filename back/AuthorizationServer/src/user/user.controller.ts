import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { GetUserWithoutPasswordDto } from 'src/dto/GetUserWithoutPassword.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService : UserService
    ){}

    @Get('/password')
    @ApiOperation({
        "summary" : "유저 정보 가져오기",
        "description" : "id과 password를 이용하여 유저 정보를 가져온다."
    })
    async getUserWithPassword(@Query("id") id : string, @Query("password") password : string) : Promise<User>{
        return await this.userService.getUserWithPassword(id, password);
    };

    @Get('/name')
    @ApiOperation({
        "summary" : "유저 정보 가져오기",
        "description" : "id과 name을 이용하여 유저 정보를 가져온다."
    })
    async getUserWithName(@Query("id") id : string, @Query("name") name : string) : Promise<User>{
        return await this.userService.getUserWithName(id, name);
    };

    @Post("")
    @ApiOperation({
        "summary" : "회원가입",
        "description" : "CreateUserDto를 이용하여 회원가입을 진행한다."
    })
    async SignUp(@Body() createUserDto: CreateUserDto) : Promise<void>{
        return await this.userService.addUser(createUserDto);
    };

    @Patch("/password")
    @ApiOperation({
        "summary" : "유저의 비밀번호 변경",
        "description" : "UpdateUserDto를 이용하여 유저의 비밀번호를 변경한다."
    })
    async updatePassword(@Body() updateUserDto: UpdateUserDto) : Promise<void>{
        return await this.userService.updateUser(updateUserDto);
    }

    @Patch("/password/default")
    @ApiOperation({
        "summary" : "유저의 비밀번호 초기화",
        "description" : "GetUserWithoutPasswordDto를 이용하여 유저의 비밀번호를 초기화한다."
    })
    async changeDefaultPassword(@Body() getUserWithoutPasswordDto : GetUserWithoutPasswordDto) : Promise<string>{
        const {id, name} = getUserWithoutPasswordDto;
        const user : User = await this.userService.getUserWithName(id, name);
        return await this.userService.changeDefaultPassword(user);
    }
}
