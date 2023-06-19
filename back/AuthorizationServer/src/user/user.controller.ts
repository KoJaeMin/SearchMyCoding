import { Body, Controller, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { GetUserWithNameDto } from 'src/dto/GetUserWithName.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/guards/local.auth.guard';
import { GetUserDto } from 'src/dto/GetUser.dto';
import { DUser } from 'src/decorators/user.decorator';

@Controller('/user')
export class UserController {
    constructor(
        private readonly userService : UserService
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('/info')
    @ApiBody({
        type: GetUserDto,
    })
    @ApiOperation({
        "summary" : "유저 정보 가져오기",
        "description" : "id과 password를 이용하여 유저 정보를 가져온다."
    })
    async getUser(@DUser() user : User,@Session() session: Record<string, any>){
        return {user, SID : session.id};
    };

    @Post("/signUp")
    @ApiOperation({
        "summary" : "회원가입",
        "description" : "CreateUserDto를 이용하여 회원가입을 진행한다."
    })
    async SignUp(@Body() createUserDto: CreateUserDto) : Promise<void>{
        return await this.userService.addUser(createUserDto);
    };

    @UseGuards(LocalAuthGuard)
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
    async changeDefaultPassword(@Body() getUserWithNameDto : GetUserWithNameDto) : Promise<string>{
        const {id, name} = getUserWithNameDto;
        const user : User = await this.userService.getUserWithName(id, name);
        return await this.userService.changeDefaultPassword(user);
    }
}
