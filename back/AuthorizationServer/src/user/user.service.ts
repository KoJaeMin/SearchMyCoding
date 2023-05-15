import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { IsValidEmail } from 'src/utils/format';
import crypto from 'crypto';
import { hash_algorithm, salt } from 'src/config/crypto.config';
import { UserRepository } from './user.repository';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { GetUserDto } from 'src/dto/GetUser.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository : UserRepository
    ){}

    async getUser(email : string, password : string) : Promise<User>{
        if(!IsValidEmail(email))
            throw new BadRequestException(`Bad Email Format`);
        const toHash = `${password}${salt}`;
        const hashedPassword = crypto.createHash(hash_algorithm).update(toHash).digest('hex');
        const User : User = await this.userRepository.findOne(email=email, password=hashedPassword);

        if(!User)
            throw new NotFoundException(`User does not exist or the password is incorrect.`);
        return User;
    }

    async getUserWithoutPassword(email : string, name : string) : Promise<User>{
        if(!IsValidEmail(email))
            throw new BadRequestException(`Bad Email Format`);
        const User : User = await this.userRepository.findOneWithoutPassword(email, name);

        if(!User)
            throw new NotFoundException(`User does not exist or the password is incorrect.`);
        return User;
    }

    async changeDefaultPassword(user : User) : Promise<string>{
        const toHash : string = `${Date.now()}${salt}${user.password}`;
        const hashedPassword : string = crypto.createHash(hash_algorithm).update(toHash).digest('hex').slice(0, 9);
        const userInfo = {
            email : user.email,
            password : user.password
        };
        const updatePassword = {
            name : user.name,
            password : hashedPassword
        };
        //// user 비번 바꾸기
        try{
            await this.userRepository.updatePassword(userInfo, updatePassword);
        }catch(err){
            throw err;
        }

        return hashedPassword;
    }

    async SignUp(createUserDto : CreateUserDto) : Promise<void>{
        if(!IsValidEmail(createUserDto.email))
            throw new BadRequestException(`Bad Email Format`);
        const toHash : string = `${createUserDto.password}${salt}`;
        const hashedPassword : string = crypto.createHash(hash_algorithm).update(toHash).digest('hex');
        await this.userRepository.creaateOne({
            email: createUserDto.email,
            password : hashedPassword,
            name: createUserDto.name
        });
    }

    async UpdatePassword(getUserDto : GetUserDto, updateUserDto : UpdateUserDto){
        const toHash = `${updateUserDto.password}${salt}`;
        const hashedPassword = crypto.createHash(hash_algorithm).update(toHash).digest('hex');
        try{
            await this.userRepository.updatePassword(getUserDto, updateUserDto);
        }catch(err){
            throw err;
        }
    }
}
