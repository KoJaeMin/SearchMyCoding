import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { IsValidEmail } from 'src/utils/format';
import crypto from 'crypto';
import { hash_algorithm, salt } from 'src/config/crypto.config';
import { UserRepository } from './user.repository';

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
}
