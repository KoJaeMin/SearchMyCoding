import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { IsValidEmail } from 'src/utils/format';
import { UserRepository } from './user.repository';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { createHashPassword } from 'src/utils/hash';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository : UserRepository
    ){}

    async getUser(email : string) : Promise<User>{
        if(!IsValidEmail(email))
            throw new BadRequestException(`Bad Email Format`);
        const User : User = await this.userRepository.findOne(email);
        if(!User)
            throw new NotFoundException(`User does not exist or the password is incorrect.`);
        return User;
    }

    async getUserWithPassword(email : string, password : string) : Promise<User>{
        if(!IsValidEmail(email))
            throw new BadRequestException(`Bad Email Format`);
        const hashedPassword : string = createHashPassword(password);
        const User : User = await this.userRepository.findOneWithPassword(email=email, password=hashedPassword);

        if(!User)
            throw new NotFoundException(`User does not exist or the password is incorrect.`);
        return User;
    }

    async getUserWithName(email : string, name : string) : Promise<User>{
        if(!IsValidEmail(email))
            throw new BadRequestException(`Bad Email Format`);
        const User : User = await this.userRepository.findOneWithName(email, name);

        if(!User)
            throw new NotFoundException(`User does not exist or the password is incorrect.`);
        return User;
    }

    async changeDefaultPassword(user : User) : Promise<string>{
        const hashedPassword : string = createHashPassword(user.password);
        const updatePassword : UpdateUserDto = {
            email : user.email,
            password : user.password,
            modifyPassword : hashedPassword
        };
        //// user 비번 바꾸기
        try{
            await this.userRepository.updatePassword(updatePassword);
        }catch(err){
            throw err;
        }

        return hashedPassword;
    }

    async signUp(createUserDto : CreateUserDto) : Promise<void>{
        if(!IsValidEmail(createUserDto.email))
            throw new BadRequestException(`Bad Email Format`);
        
        const name : string = createUserDto.name;
        const email : string = createUserDto.email;
        const passeord : string = createUserDto.password;
        
        const user : User = await this.userRepository.findOneWithName(email, name);
        if(!!user)
            throw new BadRequestException(`User is exist.`);
        const hashedPassword : string = createHashPassword(passeord);
        await this.userRepository.createOne({
            email: createUserDto.email,
            password : hashedPassword,
            name: createUserDto.name
        });
    }

    async updatePassword(updateUserDto : UpdateUserDto){
        const updateUser : UpdateUserDto = {
            email : updateUserDto.email,
            password : createHashPassword(updateUserDto.password),
            modifyPassword : createHashPassword(updateUserDto.modifyPassword)
        };
        try{
            await this.userRepository.updatePassword(updateUser);
        }catch(err){
            throw err;
        }
    }
}
