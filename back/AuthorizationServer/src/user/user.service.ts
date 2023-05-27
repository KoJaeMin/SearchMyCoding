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
        if(!IsValidEmail(id))
            throw new BadRequestException(`Bad Email Format`);
        const User : User = await this.userRepository.findOne(id);
        if(!User)
            throw new NotFoundException(`User does not exist or the password is incorrect.`);
        return User;
    }

    async getUserWithPassword(id : string, password : string) : Promise<User>{
        if(!IsValidEmail(id))
            throw new BadRequestException(`Bad Email Format`);
        const hashedPassword : string = createHashPassword(password);
        const User : User = await this.userRepository.findOneWithPassword(id=id, password=hashedPassword);

        if(!User)
            throw new NotFoundException(`User does not exist or the password is incorrect.`);
        return User;
    }

    async getUserWithName(id : string, name : string) : Promise<User>{
        if(!IsValidEmail(id))
            throw new BadRequestException(`Bad Email Format`);
        const User : User = await this.userRepository.findOneWithName(id, name);

        if(!User)
            throw new NotFoundException(`User does not exist or the password is incorrect.`);
        return User;
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
        
        const name : string = createUserDto.name;
        const email : string = createUserDto.email;
        const passeord : string = createUserDto.password;
        
        const user : User = await this.userRepository.findOneWithName(email, name);
        if(!!user)
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

    async updateUserSchema(){}
}
