import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/schemas/user.schema';
import { compareHash } from 'src/utils/hash';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService) {}
    async validateUser(id: string, password: string) : Promise<User> {
        try{
            const user : User = await this.usersService.getUserWithPassword(id, password);
            return user;
        }catch(err){
            throw new BadRequestException("User doesn't exist or Enter wrong information");
        }
    }

    async logIn(id : string, password : string){
        const user : User = await this.usersService.getUser(id);
        if(!compareHash(password, user.password)){
            throw new UnauthorizedException(`password is wrong`);
        }
        /// 비림 번호를 제외한 정보 반환
        const {password : pw, ...result} = user;
        return result;
    }
}
