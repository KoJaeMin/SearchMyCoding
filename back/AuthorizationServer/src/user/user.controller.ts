import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { GetUserDto } from 'src/dto/GetUser.dto';
import { GetUserWithoutPasswordDto } from 'src/dto/GetUserWithoutPassword.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService : UserService
    ){}

    @Get('/User')
    @ApiOperation({
        "summary" : "유저 정보 가져오기",
        "description" : "email과 password를 이용하여 유저 정보를 가져온다."
    })
    async getUser(@Query("email") email : string, @Query("password") password : string) : Promise<User>{
        return await this.userService.getUser(email, password);
    };

    @Get('/UserWitoutPassword')
    @ApiOperation({
        "summary" : "유저 정보 가져오기",
        "description" : "email과 name을 이용하여 유저 정보를 가져온다."
    })
    async getUserWithoutPassword(@Query("email") email : string, @Query("name") name : string) : Promise<User>{
        const getUserWithoutPasswordDto : GetUserWithoutPasswordDto = {
            email : email,
            name : name
        }
        return await this.userService.getUserWithoutPassword(getUserWithoutPasswordDto);
    };

    @Post("")
    @ApiOperation({
        "summary" : "회원가입",
        "description" : "CreateUserDto를 이용하여 회원가입을 진행한다."
    })
    async SignUp(@Body() createUserDto: CreateUserDto) : Promise<void>{
        return await this.userService.signUp(createUserDto);
    };

    @Patch("/password")
    @ApiOperation({
        "summary" : "유저의 비밀번호 변경",
        "description" : "UpdateUserDto를 이용하여 유저의 비밀번호를 변경한다."
    })
    async updatePassword(@Body() updateUserDto: UpdateUserDto) : Promise<void>{
        return await this.userService.updatePassword(updateUserDto);
    }

    @Patch("/password/default")
    @ApiOperation({
        "summary" : "유저의 비밀번호 초기화",
        "description" : "GetUserWithoutPasswordDto를 이용하여 유저의 비밀번호를 초기화한다."
    })
    async changeDefaultPassword(@Body() getUserWithoutPasswordDto : GetUserWithoutPasswordDto) : Promise<string>{
        const user : User = await this.userService.getUserWithoutPassword(getUserWithoutPasswordDto);
        return await this.userService.changeDefaultPassword(user);
    }
}
