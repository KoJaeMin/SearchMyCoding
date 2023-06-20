import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { concatObject, getPropertyOfDifferenceSet, IsValidEmail } from 'src/utils/format';
import { UserRepository } from './user.repository';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { createHashPassword } from 'src/utils/hash';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository : UserRepository
    ){}

    async getUser(id : string) : Promise<User>{
        const User : User = await this.userRepository.findOneWithId(id);
        if(!User)
            throw new NotFoundException(`User does not exist.`);
        return User;
    }

    async getUserId(name : string, email : string) : Promise<string>{
        const user : User = await this.userRepository.findOneWithEmail(email);
        if(!user || user.name !== name)
            throw new NotFoundException(`User does not exist.`);
        return user.id;
    }

    async changeDefaultPassword(user : User) : Promise<string>{
        const hashedPassword : string = createHashPassword(user.password);
        const updateUser : UpdateUserDto = {
            id : user.id,
            password : user.password,
            modifyPassword : hashedPassword
        };
        //// user 비번 바꾸기
        try{
            await this.userRepository.updateUser(updateUser);
        }catch(err){
            throw err;
        }

        return hashedPassword;
    }

    async addUser(createUserDto : CreateUserDto) : Promise<void>{
        if(!IsValidEmail(createUserDto.email))
            throw new BadRequestException(`Bad Email Format`);
        
        const id : string = createUserDto.id;
        const email : string = createUserDto.email;
        const passeord : string = createUserDto.password;
        
        const userWithId : User = await this.userRepository.findOneWithId(id);
        const userWithEmail : User = await this.userRepository.findOneWithEmail(email);
        if(userWithId || userWithEmail)
            throw new BadRequestException(`User is exist.`);
        const hashedPassword : string = createHashPassword(passeord);
        await this.userRepository.createOne({
            id : createUserDto.id,
            email: createUserDto.email,
            password : hashedPassword,
            name: createUserDto.name
        });
    }

    async updateUser(updateUserDto : UpdateUserDto){
        const updateUser : UpdateUserDto = {
            id : updateUserDto.id,
            password : createHashPassword(updateUserDto.password)
        };
        if(updateUserDto.modifyPassword)
            Object.assign(updateUserDto, {modifyPassword : createHashPassword(updateUserDto.modifyPassword)});
        concatObject(updateUser, getPropertyOfDifferenceSet(updateUserDto, updateUser));

        try{
            await this.userRepository.updateUser(updateUser);
        }catch(err){
            throw err;
        }
    }

    /**
     * todo : User schema 변경하는 기능 추가
     */
    // async updateUserSchema(){}
}
